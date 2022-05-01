import { REDIS_AD_COMPANIES_KEY } from "../constant-value/redis/redis-constant";
import { RedisType } from "../db/db";
import { Advertisement } from "../entity/advertisement";
import { AdvertisementGrade } from "../entity/advertisement-grade";
import { IAdvertisementRepository } from "../repository/advertisement/advertisement-interface";
import { ICompanyRepository } from "../repository/company/company-interface";
import { AdCompanyWithAdGrade } from "../types/advertising-company";

export class AdvertisementService {
  constructor(
    private redisClient: RedisType,
    private advertisementRepo: IAdvertisementRepository,
    private companyRepo: ICompanyRepository
  ) {}

  async save(
    companyName: string,
    advertisementGrade: AdvertisementGrade,
    startDate: Date
  ) {
    const company = await this.companyRepo.findByName(companyName);
    if (company == null) {
      throw new Error("company not found");
    }

    const advertisement = Advertisement.create(
      advertisementGrade,
      company,
      startDate
    );
    await this.advertisementRepo.save(advertisement);
  }

  // redis cache로부터 광고하는 회사들 가져옴
  async getAllCurrentAdvertisingCompany(): Promise<AdCompanyWithAdGrade[]> {
    const advertisingCompanyString = await this.redisClient.LRANGE(
      REDIS_AD_COMPANIES_KEY,
      0,
      -1
    );

    const advertisingCompanyList: AdCompanyWithAdGrade[] = [];

    for (const companyString of advertisingCompanyString) {
      advertisingCompanyList.push(JSON.parse(companyString));
    }
    return advertisingCompanyList;
  }

  async getAllAdvertisingCompany(): Promise<AdCompanyWithAdGrade[]> {
    const allAd = await this.advertisementRepo.getAllAdvertisingCompany();
    const companiesWithAdGrade: AdCompanyWithAdGrade[] = [];
    for (const ad of allAd) {
      companiesWithAdGrade.push({
        companyName: (await ad.company).name,
        adGrade: ad.grade,
      });
    }
    return companiesWithAdGrade;
  }
}
