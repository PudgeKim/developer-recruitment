import { DataSource } from "typeorm";
import { Company } from "../entity/company";
import { Department } from "../entity/department";
import { TechStack } from "../entity/tech-stack";
import { ICompanyRepository } from "../repository/company/company-interface";
import { IDepartmentRepository } from "../repository/department/department-interface";
import { ITechStackRepository } from "../repository/tech-stack/tech-stack-interface";

export class CompanyService {
  private appDataSource: DataSource;
  private companyRepo: ICompanyRepository;
  private departmentRepo: IDepartmentRepository;
  private techStackRepo: ITechStackRepository;

  constructor(
    appDataSource: DataSource,
    companyRepo: ICompanyRepository,
    departmentRepo: IDepartmentRepository,
    techStackRepo: ITechStackRepository
  ) {
    this.appDataSource = appDataSource;
    this.companyRepo = companyRepo;
    this.departmentRepo = departmentRepo;
    this.techStackRepo = techStackRepo;
  }

  public async saveCompany(company: Company): Promise<Company> {
    const savedCompany = await this.companyRepo.save(company);
    return savedCompany;
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
      // techStack을 먼저 저장하고 department에 끼워넣음
      const savedTechStack = await this.saveTechStack(techStack);
      department.techStack = Promise.resolve(savedTechStack);
      // 이후 department를 저장하고 company에 끼워넣음
      const savedDepartment = await this.departmentRepo.save(department);
      company.departments = Promise.resolve([savedDepartment]);
    });
  }

  private async saveTechStack(techStack: TechStack): Promise<TechStack> {
    const savedTechStack = await this.techStackRepo.save(techStack);
    return savedTechStack;
  }
}
