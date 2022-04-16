import { DataSource, Repository } from "typeorm";
import { Company } from "../../entity/company";

export class CompanyRepository {
  private companyRepo: Repository<Company>;
  private appDataSource: DataSource;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.companyRepo = this.appDataSource.getRepository(Company);
  }

  public async save(company: Company): Promise<Company> {
    const savedCompany = await this.companyRepo.save(company);
    return savedCompany;
  }

  public async findById(id: number): Promise<Company | null> {
    const company = await this.companyRepo.findOneBy({
      id: id,
    });
    return company;
  }

  public async findByName(name: string): Promise<Company | null> {
    const company = await this.companyRepo.findOneBy({
      name: name,
    });
    return company;
  }
}
