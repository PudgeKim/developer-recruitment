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

// 쿠키에 세션 저장
// (Strategy가 성공하면 발동됨)
// verifyCallback이 done(null, profile)이므로
// profile이 첫번째 인자로 넘어옴
passport.serializeUser((profile: any, done) => {
  // profile._json: {id, picture, email, email_verified}
  console.log("serislizeUser");
  console.log("profile: ", profile._json);
  done(null, profile._json);
});

// 쿠키로부터 세션을 읽음
// 콜백 첫번째 인자는 serializeUser의 done으로부터 넘어옴
// deserializeUser로 인해 req.user에 세팅해줌
passport.deserializeUser((profile: any, done) => {
  done(null, profile);
});

const PORT = 3030;
const app: Express = express();

// app.use(helmet());
app.use(
  cookieSession({
    name: "session", // 쿠키의 키 이름
    maxAge: 60 * 60 * 1000, // 1 hour
    keys: [String(config.COOKIE_SESSION_SECRET)],
  })
);
app.use(passport.initialize());
app.use(passport.session()); // 이 middleware는 passport.deserializeUser 함수를 부른다. (req.user에 저장됨)

app.use(express.json());
app.use("/auth", authRouter.getRouter());
app.use("/company", companyRouter.getRouter());
app.get("/", indexHandler);

app.listen(PORT, async () => {
  await redisClient.connect();
  advertisementCron.updateAdvertisementEveryMidnight(); // cronJob
  console.log("Server is running..");
});
