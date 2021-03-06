"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("./config/config");
const db_1 = require("./db/db");
const handlers_1 = require("./handlers");
const google_oauth_1 = require("./helpers/google-oauth");
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_1 = require("./repository/user/user");
const user_2 = require("./services/user");
const auth_1 = require("./router/auth");
const company_1 = require("./router/company");
const company_2 = require("./repository/company/company");
const company_3 = require("./services/company");
const department_1 = require("./repository/department/department");
const tech_stack_1 = require("./repository/tech-stack/tech-stack");
const meal_allowance_1 = require("./repository/meal-allowance/meal-allowance");
const office_hours_1 = require("./repository/office-hours/office-hours");
const welfare_product_1 = require("./repository/welfare-product/welfare-product");
const company_4 = require("./controller/company");
const cron_1 = require("./cron/cron");
const advertisement_1 = require("./repository/advertisement/advertisement");
db_1.appDataSource
    .initialize()
    .then(() => {
    console.log("AppDataSource initialized");
})
    .catch((err) => console.log(err));
const userRepo = new user_1.UserRepository(db_1.appDataSource);
const companyRepo = new company_2.CompanyRepository(db_1.appDataSource);
const departmentRepo = new department_1.DepartmentRepository(db_1.appDataSource);
const techStackRepo = new tech_stack_1.TechStackRepository(db_1.appDataSource);
const mealAllowanceRepo = new meal_allowance_1.MealAllowanceRepository(db_1.appDataSource);
const officeHoursRepo = new office_hours_1.OfficeHoursRepository(db_1.appDataSource);
const welfareProductRepo = new welfare_product_1.WelfareProductRepository(db_1.appDataSource);
const advertisementRepo = new advertisement_1.AdvertisementRepository(db_1.appDataSource);
const userService = new user_2.UserService(userRepo);
const companyService = new company_3.CompanyService(db_1.appDataSource, companyRepo, departmentRepo, techStackRepo, officeHoursRepo, mealAllowanceRepo, welfareProductRepo);
const companyController = new company_4.CompanyController(companyService);
const authRouter = new auth_1.AuthRouter(userService);
const companyRouter = new company_1.CompanyRouter(companyController);
const advertisementCron = new cron_1.AdvertisementCron(db_1.redisClient, advertisementRepo);
passport_1.default.use(new passport_google_oauth20_1.Strategy(google_oauth_1.OAUTH_OPTIONS, google_oauth_1.verifyCallback));
// ????????? ?????? ??????
// (Strategy??? ???????????? ?????????)
// verifyCallback??? done(null, profile)?????????
// profile??? ????????? ????????? ?????????
passport_1.default.serializeUser((profile, done) => {
    // profile._json: {id, picture, email, email_verified}
    console.log("serislizeUser");
    console.log("profile: ", profile._json);
    done(null, profile._json);
});
// ??????????????? ????????? ??????
// ?????? ????????? ????????? serializeUser??? done???????????? ?????????
// deserializeUser??? ?????? req.user??? ????????????
passport_1.default.deserializeUser((profile, done) => {
    done(null, profile);
});
const PORT = 3030;
const app = express_1.default();
// app.use(helmet());
app.use(cookie_session_1.default({
    name: "session",
    maxAge: 60 * 60 * 1000,
    keys: [String(config_1.config.COOKIE_SESSION_SECRET)],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session()); // ??? middleware??? passport.deserializeUser ????????? ?????????. (req.user??? ?????????)
app.use(express_1.default.json());
app.use("/auth", authRouter.getRouter());
app.use("/company", companyRouter.getRouter());
app.get("/", handlers_1.indexHandler);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.redisClient.connect();
    advertisementCron.updateAdvertisementEveryMidnight(); // cronJob
    console.log("Server is running..");
}));
