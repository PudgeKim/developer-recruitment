import { Advertisement } from "../entity/advertisement";
import { AdvertisementGrade } from "../entity/advertisement-grade";
import { IAdvertisementRepository } from "../repository/advertisement/advertisement-interface";
import { ICompanyRepository } from "../repository/company/company-interface";

export class AdvertisementService {
  constructor(
    private advertisementRepo: IAdvertisementRepository,
    private companyRepo: ICompanyRepository
  ) {}

  async save(companyName: string, advertisementGrade: AdvertisementGrade) {
    const company = await this.companyRepo.findByName(companyName);
    if (company == null) {
      throw new Error("company not found");
    }

    const advertisement = Advertisement.create(advertisementGrade, company);
    await this.advertisementRepo.save(advertisement);
  }
}
