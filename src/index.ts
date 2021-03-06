import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "./config/config";
import { appDataSource, redisClient } from "./db/db";
import { indexHandler } from "./handlers";
import { OAUTH_OPTIONS, verifyCallback } from "./helpers/google-oauth";
import cookieSession from "cookie-session";
import { UserRepository } from "./repository/user/user";
import { UserService } from "./services/user";
import { AuthRouter } from "./router/auth";
import { CompanyRouter } from "./router/company";
import { CompanyRepository } from "./repository/company/company";
import { CompanyService } from "./services/company";
import { DepartmentRepository } from "./repository/department/department";
import { TechStackRepository } from "./repository/tech-stack/tech-stack";
import { MealAllowanceRepository } from "./repository/meal-allowance/meal-allowance";
import { OfficeHoursRepository } from "./repository/office-hours/office-hours";
import { WelfareProductRepository } from "./repository/welfare-product/welfare-product";
import { CompanyController } from "./controller/company";
import { AdvertisementCron } from "./cron/cron";
import { AdvertisementRepository } from "./repository/advertisement/advertisement";

appDataSource
  .initialize()
  .then(() => {
    console.log("AppDataSource initialized");
  })
  .catch((err) => console.log(err));

const userRepo = new UserRepository(appDataSource);
const companyRepo = new CompanyRepository(appDataSource);
const departmentRepo = new DepartmentRepository(appDataSource);
const techStackRepo = new TechStackRepository(appDataSource);
const mealAllowanceRepo = new MealAllowanceRepository(appDataSource);
const officeHoursRepo = new OfficeHoursRepository(appDataSource);
const welfareProductRepo = new WelfareProductRepository(appDataSource);
const advertisementRepo = new AdvertisementRepository(appDataSource);

const userService = new UserService(userRepo);
const companyService = new CompanyService(
  appDataSource,
  companyRepo,
  departmentRepo,
  techStackRepo,
  officeHoursRepo,
  mealAllowanceRepo,
  welfareProductRepo
);

const companyController = new CompanyController(companyService);

const authRouter = new AuthRouter(userService);
const companyRouter = new CompanyRouter(companyController);

const advertisementCron = new AdvertisementCron(redisClient, advertisementRepo);

passport.use(new Strategy(OAUTH_OPTIONS, verifyCallback));

// ????????? ?????? ??????
// (Strategy??? ???????????? ?????????)
// verifyCallback??? done(null, profile)?????????
// profile??? ????????? ????????? ?????????
passport.serializeUser((profile: any, done) => {
  // profile._json: {id, picture, email, email_verified}
  console.log("serislizeUser");
  console.log("profile: ", profile._json);
  done(null, profile._json);
});

// ??????????????? ????????? ??????
// ?????? ????????? ????????? serializeUser??? done???????????? ?????????
// deserializeUser??? ?????? req.user??? ????????????
passport.deserializeUser((profile: any, done) => {
  done(null, profile);
});

const PORT = 3030;
const app: Express = express();

// app.use(helmet());
app.use(
  cookieSession({
    name: "session", // ????????? ??? ??????
    maxAge: 60 * 60 * 1000, // 1 hour
    keys: [String(config.COOKIE_SESSION_SECRET)],
  })
);
app.use(passport.initialize());
app.use(passport.session()); // ??? middleware??? passport.deserializeUser ????????? ?????????. (req.user??? ?????????)

app.use(express.json());
app.use("/auth", authRouter.getRouter());
app.use("/company", companyRouter.getRouter());
app.get("/", indexHandler);

app.listen(PORT, async () => {
  await redisClient.connect();
  advertisementCron.updateAdvertisementEveryMidnight(); // cronJob
  console.log("Server is running..");
});
