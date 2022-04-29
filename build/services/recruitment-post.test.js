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
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const address_1 = require("../entity/address");
const company_1 = require("../entity/company");
const recruitment_post_1 = require("../entity/recruitment-post");
const company_2 = require("../repository/company/company");
const department_1 = require("../repository/department/department");
const meal_allowance_1 = require("../repository/meal-allowance/meal-allowance");
const office_hours_1 = require("../repository/office-hours/office-hours");
const recruitment_post_2 = require("../repository/recruitment-post/recruitment-post");
const tech_stack_1 = require("../repository/tech-stack/tech-stack");
const welfare_product_1 = require("../repository/welfare-product/welfare-product");
const company_3 = require("./company");
const recruitment_post_3 = require("./recruitment-post");
let appDataSource;
let companyRepo;
let departmentRepo;
let techStackRepo;
let officeHoursRepo;
let mealAllowanceRepo;
let welfareProductRepo;
let recruitmentPostRepo;
let companyService;
let recruitmentPostService;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    appDataSource = new typeorm_1.DataSource({
        type: "postgres",
        host: "localhost",
        port: 5151,
        username: "root",
        password: "mypassword",
        database: "developer_recruitment",
        synchronize: true,
        logging: true,
        dropSchema: true,
        entities: [path_1.default.join(__dirname, "..", "entity", "*.{js,ts}")],
    });
    yield appDataSource
        .initialize()
        .then(() => {
        console.log("appDataSource test initialized");
    })
        .catch((err) => console.log(err));
    companyRepo = new company_2.CompanyRepository(appDataSource);
    departmentRepo = new department_1.DepartmentRepository(appDataSource);
    techStackRepo = new tech_stack_1.TechStackRepository(appDataSource);
    officeHoursRepo = new office_hours_1.OfficeHoursRepository(appDataSource);
    mealAllowanceRepo = new meal_allowance_1.MealAllowanceRepository(appDataSource);
    welfareProductRepo = new welfare_product_1.WelfareProductRepository(appDataSource);
    recruitmentPostRepo = new recruitment_post_2.recruitmentPostRepository(appDataSource);
    companyService = new company_3.CompanyService(appDataSource, companyRepo, departmentRepo, techStackRepo, officeHoursRepo, mealAllowanceRepo, welfareProductRepo);
    recruitmentPostService = new recruitment_post_3.RecruitmentPostService(recruitmentPostRepo, companyRepo);
}));
describe("test recruitment service", () => {
    test("save recruitmentpost", () => __awaiter(void 0, void 0, void 0, function* () {
        const address = address_1.Address.create("seoul", "songpa", "54332", "jamsil", 8);
        const company = company_1.Company.create("JM-Stream", address);
        yield appDataSource.manager.save(company);
        const recruitmentPost = recruitment_post_1.RecruitmentPost.create("JM 프론트엔드 채용공고", "채용합니다", false);
        recruitmentPost.company = Promise.resolve(company);
        yield appDataSource.manager.save(recruitmentPost);
        const recruitmentPost2 = recruitment_post_1.RecruitmentPost.create("JM 백엔드 채용공고", "채용합니다2", false);
        recruitmentPost2.company = Promise.resolve(company);
        yield appDataSource.manager.save(recruitmentPost2);
        const allPost = yield recruitmentPostService.getAllPostByCompanyName("JM-Stream");
        expect(allPost[0].title).toBe("JM 프론트엔드 채용공고");
        expect(allPost[1].title).toBe("JM 백엔드 채용공고");
    }));
});
