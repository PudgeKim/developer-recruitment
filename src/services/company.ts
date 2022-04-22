import { DataSource } from "typeorm";
import { Company } from "../entity/company";
import { Department } from "../entity/department";
import { MealAllowance } from "../entity/meal-allowance";
import { OfficeHours } from "../entity/office-hours";
import { TechStack } from "../entity/tech-stack";
import { WelfareProduct } from "../entity/welfare-product";
import { ICompanyRepository } from "../repository/company/company-interface";
import { IDepartmentRepository } from "../repository/department/department-interface";
import { IMealAllowanceRepository } from "../repository/meal-allowance/meal-allowance-interface";
import { IOfficeHoursRepository } from "../repository/office-hours/office-hours-interface";
import { ITechStackRepository } from "../repository/tech-stack/tech-stack-interface";
import { IWellfareProductRepository } from "../repository/welfare-product/welfare-product-interface";

export class CompanyService {
  private appDataSource: DataSource;
  private companyRepo: ICompanyRepository;
  private departmentRepo: IDepartmentRepository;
  private techStackRepo: ITechStackRepository;
  private officeHoursRepo: IOfficeHoursRepository;
  private mealAllowanceRepo: IMealAllowanceRepository;
  private welfareProductRepo: IWellfareProductRepository;

  constructor(
    appDataSource: DataSource,
    companyRepo: ICompanyRepository,
    departmentRepo: IDepartmentRepository,
    techStackRepo: ITechStackRepository,
    officeHoursRepo: IOfficeHoursRepository,
    mealAllowanceRepo: IMealAllowanceRepository,
    welfareProductRepo: IWellfareProductRepository
  ) {
    this.appDataSource = appDataSource;
    this.companyRepo = companyRepo;
    this.departmentRepo = departmentRepo;
    this.techStackRepo = techStackRepo;
    this.officeHoursRepo = officeHoursRepo;
    this.mealAllowanceRepo = mealAllowanceRepo;
    this.welfareProductRepo = welfareProductRepo;
  }

  public async saveCompany(company: Company): Promise<Company> {
    const savedCompany = await this.companyRepo.save(company);
    return savedCompany;
  }

  public async findCompany(name: string): Promise<Company | null> {
    const company = await this.companyRepo.findByName(name);
    return company;
  }

  public async saveDepartment(
    companyName: string,
    department: Department,
    techStack: TechStack
  ) {
    const company = await this.companyRepo.findByName(companyName);
    if (company == null) {
      throw new Error("Not Found");
    }

    // 다중 쿼리이므로 transaction 사용
    await this.appDataSource.transaction(async () => {
      try {
        const savedTechStack = await this.saveTechStack(techStack);

        department.techStack = Promise.resolve(savedTechStack);
        const savedDepartment = await this.departmentRepo.save(department);

        company.departments = Promise.resolve([savedDepartment]);
        await this.companyRepo.save(company);
      } catch (e) {
        console.log("companyService transaction error: ", e);
      }
    });
  }

  private async saveTechStack(techStack: TechStack): Promise<TechStack> {
    const savedTechStack = await this.techStackRepo.save(techStack);
    return savedTechStack;
  }

  public async saveOfficeHours(officeHours: OfficeHours) {
    await this.officeHoursRepo.save(officeHours);
  }

  public async saveWelfareProduct(welfareProduct: WelfareProduct) {
    await this.welfareProductRepo.save(welfareProduct);
  }

  public async saveMealAllowance(mealAllowance: MealAllowance) {
    await this.mealAllowanceRepo.save(mealAllowance);
  }
}
