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
const department_1 = require("../entity/department");
const tech_stack_1 = require("../entity/tech-stack");
const company_2 = require("../repository/company/company");
const department_2 = require("../repository/department/department");
const meal_allowance_1 = require("../repository/meal-allowance/meal-allowance");
const office_hours_1 = require("../repository/office-hours/office-hours");
const tech_stack_2 = require("../repository/tech-stack/tech-stack");
const welfare_product_1 = require("../repository/welfare-product/welfare-product");
const company_3 = require("./company");
let appDataSource;
let companyRepo;
let departmentRepo;
let techStackRepo;
let officeHoursRepo;
let mealAllowanceRepo;
let welfareProductRepo;
let companyService;
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
    departmentRepo = new department_2.DepartmentRepository(appDataSource);
    techStackRepo = new tech_stack_2.TechStackRepository(appDataSource);
    officeHoursRepo = new office_hours_1.OfficeHoursRepository(appDataSource);
    mealAllowanceRepo = new meal_allowance_1.MealAllowanceRepository(appDataSource);
    welfareProductRepo = new welfare_product_1.WelfareProductRepository(appDataSource);
    companyService = new company_3.CompanyService(appDataSource, companyRepo, departmentRepo, techStackRepo, officeHoursRepo, mealAllowanceRepo, welfareProductRepo);
}));
describe("test company service", () => {
    test("save company", () => __awaiter(void 0, void 0, void 0, function* () {
        const address = address_1.Address.create("seoul", "songpa", "54332", "jamsil", 8);
        const company = new company_1.Company();
        company.address = address;
        company.name = "JM company";
        const savedCompany = yield companyService.saveCompany(company);
        expect(savedCompany.name).toBe("JM company");
        expect(savedCompany.address).toBe(address);
    }));
    test("save department", () => __awaiter(void 0, void 0, void 0, function* () {
        const company = yield companyService.findCompany("JM company");
        if (company == null) {
            throw new Error("null error");
        }
        const department = department_1.Department.create("backend1team", 11, "backend");
        const techStack = tech_stack_1.TechStack.create("nest.js", "webframework");
        yield companyService.saveDepartment(company.name, department, techStack);
        const savedCompany = yield companyService.findCompany("JM company");
        if (savedCompany == null) {
            throw new Error("null error");
        }
        const departmentList = yield savedCompany.departments;
        const savedDeaprtment = departmentList[0];
        expect(savedDeaprtment.name).toBe("backend1team");
        expect(savedDeaprtment.headCount).toBe(11);
        expect(savedDeaprtment.type).toBe("backend");
    }));
});
