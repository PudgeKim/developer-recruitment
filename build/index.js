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
db_1.AppDataSource.initialize()
    .then(() => {
    console.log("AppDataSource initialized");
})
    .catch((err) => console.log(err));
const userRepo = new user_1.UserRepository(db_1.AppDataSource);
const companyRepo = new company_2.CompanyRepository(db_1.AppDataSource);
const departmentRepo = new department_1.DepartmentRepository(db_1.AppDataSource);
const techStackRepo = new tech_stack_1.TechStackRepository(db_1.AppDataSource);
const mealAllowanceRepo = new meal_allowance_1.MealAllowanceRepository(db_1.AppDataSource);
const officeHoursRepo = new office_hours_1.OfficeHoursRepository(db_1.AppDataSource);
const welfareProductRepo = new welfare_product_1.WelfareProductRepository(db_1.AppDataSource);
const userService = new user_2.UserService(userRepo);
const companyService = new company_3.CompanyService(db_1.AppDataSource, companyRepo, departmentRepo, techStackRepo, officeHoursRepo, mealAllowanceRepo, welfareProductRepo);
const companyController = new company_4.CompanyController(companyService);
const authRouter = new auth_1.AuthRouter(userService);
const companyRouter = new company_1.CompanyRouter(companyController);
passport_1.default.use(new passport_google_oauth20_1.Strategy(google_oauth_1.OAUTH_OPTIONS, google_oauth_1.verifyCallback));
// 쿠키에 세션 저장
// (Strategy가 성공하면 발동됨)
// verifyCallback이 done(null, profile)이므로
// profile이 첫번째 인자로 넘어옴
passport_1.default.serializeUser((profile, done) => {
    // profile._json: {id, picture, email, email_verified}
    console.log("serislizeUser");
    console.log("profile: ", profile._json);
    done(null, profile._json);
});
// 쿠키로부터 세션을 읽음
// 콜백 첫번째 인자는 serializeUser의 done으로부터 넘어옴
// deserializeUser로 인해 req.user에 세팅해줌
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
app.use(passport_1.default.session()); // 이 middleware는 passport.deserializeUser 함수를 부른다. (req.user에 저장됨)
app.use(express_1.default.json());
app.use("/auth", authRouter.getRouter());
app.use("/company", companyRouter.getRouter());
app.get("/", handlers_1.indexHandler);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.redisClient.connect();
    console.log("Server is running..");
}));
