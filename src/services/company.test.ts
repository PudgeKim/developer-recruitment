import path from "path";
import { DataSource } from "typeorm";
import { Address } from "../entity/address";
import { AppUser } from "../entity/app-user";
import { Company } from "../entity/company";
import { Department } from "../entity/department";
import { TechStack } from "../entity/tech-stack";
import { CompanyRepository } from "../repository/company/company";
import { ICompanyRepository } from "../repository/company/company-interface";
import { DepartmentRepository } from "../repository/department/department";
import { IDepartmentRepository } from "../repository/department/department-interface";
import { MealAllowanceRepository } from "../repository/meal-allowance/meal-allowance";
import { IMealAllowanceRepository } from "../repository/meal-allowance/meal-allowance-interface";
import { OfficeHoursRepository } from "../repository/office-hours/office-hours";
import { IOfficeHoursRepository } from "../repository/office-hours/office-hours-interface";
import { TechStackRepository } from "../repository/tech-stack/tech-stack";
import { ITechStackRepository } from "../repository/tech-stack/tech-stack-interface";
import { WelfareProductRepository } from "../repository/welfare-product/welfare-product";
import { IWellfareProductRepository } from "../repository/welfare-product/welfare-product-interface";
import { CompanyService } from "./company";

let appDataSource: DataSource;

let companyRepo: ICompanyRepository;
let departmentRepo: IDepartmentRepository;
let techStackRepo: ITechStackRepository;
let officeHoursRepo: IOfficeHoursRepository;
let mealAllowanceRepo: IMealAllowanceRepository;
let welfareProductRepo: IWellfareProductRepository;

let companyService: CompanyService;

beforeAll(async () => {
  appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5151,
    username: "root",
    password: "mypassword",
    database: "developer_recruitment",
    synchronize: true,
    logging: true,
    dropSchema: true,
    entities: [path.join(__dirname, "..", "entity", "*.{js,ts}")],
  });

  await appDataSource
    .initialize()
    .then(() => {
      console.log("appDataSource test initialized");
    })
    .catch((err) => console.log(err));

  companyRepo = new CompanyRepository(appDataSource);
  departmentRepo = new DepartmentRepository(appDataSource);
  techStackRepo = new TechStackRepository(appDataSource);
  officeHoursRepo = new OfficeHoursRepository(appDataSource);
  mealAllowanceRepo = new MealAllowanceRepository(appDataSource);
  welfareProductRepo = new WelfareProductRepository(appDataSource);

  companyService = new CompanyService(
    appDataSource,
    companyRepo,
    departmentRepo,
    techStackRepo,
    officeHoursRepo,
    mealAllowanceRepo,
    welfareProductRepo
  );
});

describe("test company service", () => {
  test("save company", async () => {
    const address = Address.create("seoul", "songpa", "54332", "jamsil", 8);
    const company = new Company();
    company.address = address;
    company.name = "JM company";

    const savedCompany = await companyService.saveCompany(company);
    expect(savedCompany.name).toBe("JM company");
    expect(savedCompany.address).toBe(address);
  });

  test("save department", async () => {
    const company = await companyService.findCompany("JM company");
    if (company == null) {
      throw new Error("null error");
    }

    const department = Department.create("backend1team", 11, "backend");
    const techStack = TechStack.create("nest.js", "webframework");
    await companyService.saveDepartment(company.name, department, techStack);

    const savedCompany = await companyService.findCompany("JM company");
    if (savedCompany == null) {
      throw new Error("null error");
    }

    const departmentList = await savedCompany.departments;
    const savedDeaprtment = departmentList[0];

    expect(savedDeaprtment.name).toBe("backend1team");
    expect(savedDeaprtment.headCount).toBe(11);
    expect(savedDeaprtment.type).toBe("backend");
  });
});
