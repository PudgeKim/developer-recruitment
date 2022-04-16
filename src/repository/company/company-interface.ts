import { Company } from "../../entity/company";

export interface ICompanyRepository {
  save(company: Company): Promise<Company>;
  findById(id: number): Promise<Company | null>;
  findByName(name: string): Promise<Company | null>;
}
