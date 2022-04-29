import path from "path";
import { DataSource } from "typeorm";
import { Address } from "../entity/address";
import { AppUser } from "../entity/app-user";
import { Company } from "../entity/company";
import { Department } from "../entity/department";
import { RecruitmentPost } from "../entity/recruitment-post";
import { TechStack } from "../entity/tech-stack";
import { CompanyRepository } from "../repository/company/company";
import { ICompanyRepository } from "../repository/company/company-interface";
import { DepartmentRepository } from "../repository/department/department";
import { IDepartmentRepository } from "../repository/department/department-interface";
import { MealAllowanceRepository } from "../repository/meal-allowance/meal-allowance";
import { IMealAllowanceRepository } from "../repository/meal-allowance/meal-allowance-interface";
import { OfficeHoursRepository } from "../repository/office-hours/office-hours";
import { IOfficeHoursRepository } from "../repository/office-hours/office-hours-interface";
import { recruitmentPostRepository } from "../repository/recruitment-post/recruitment-post";
import { IrecruitmentPostRepository } from "../repository/recruitment-post/recruitment-post-interface";
import { TechStackRepository } from "../repository/tech-stack/tech-stack";
import { ITechStackRepository } from "../repository/tech-stack/tech-stack-interface";
import { WelfareProductRepository } from "../repository/welfare-product/welfare-product";
import { IWellfareProductRepository } from "../repository/welfare-product/welfare-product-interface";
import { CompanyService } from "./company";
import { RecruitmentPostService } from "./recruitment-post";

let appDataSource: DataSource;

let companyRepo: ICompanyRepository;
let departmentRepo: IDepartmentRepository;
let techStackRepo: ITechStackRepository;
let officeHoursRepo: IOfficeHoursRepository;
let mealAllowanceRepo: IMealAllowanceRepository;
let welfareProductRepo: IWellfareProductRepository;
let recruitmentPostRepo: IrecruitmentPostRepository;

let companyService: CompanyService;
let recruitmentPostService: RecruitmentPostService;

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
  recruitmentPostRepo = new recruitmentPostRepository(appDataSource);

  companyService = new CompanyService(
    appDataSource,
    companyRepo,
    departmentRepo,
    techStackRepo,
    officeHoursRepo,
    mealAllowanceRepo,
    welfareProductRepo
  );

  recruitmentPostService = new RecruitmentPostService(
    recruitmentPostRepo,
    companyRepo
  );
});

describe("test recruitment service", () => {
  test("save recruitmentpost", async () => {
    const address = Address.create("seoul", "songpa", "54332", "jamsil", 8);
    const company = Company.create("JM-Stream", address);
    await appDataSource.manager.save(company);

    const recruitmentPost = RecruitmentPost.create(
      "JM 프론트엔드 채용공고",
      "채용합니다",
      false
    );
    recruitmentPost.company = Promise.resolve(company);
    await appDataSource.manager.save(recruitmentPost);

    const recruitmentPost2 = RecruitmentPost.create(
      "JM 백엔드 채용공고",
      "채용합니다2",
      false
    );
    recruitmentPost2.company = Promise.resolve(company);
    await appDataSource.manager.save(recruitmentPost2);

    const allPost = await recruitmentPostService.getAllPostByCompanyName(
      "JM-Stream"
    );
    expect(allPost[0].title).toBe("JM 프론트엔드 채용공고");
    expect(allPost[1].title).toBe("JM 백엔드 채용공고");
  });
});
