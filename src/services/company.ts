import { Company } from "../entity/company";
import { ICompanyRepository } from "../repository/company/company-interface";

export class CompanyService {
  private companyRepo: ICompanyRepository;

  constructor(companyRepo: ICompanyRepository) {
    this.companyRepo = companyRepo;
  }

  public async save(company: Company): Promise<Company> {
    const savedCompany = await this.companyRepo.save(company);
    return savedCompany;
  }
}
