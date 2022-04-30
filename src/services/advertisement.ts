import { RedisClientType } from "@node-redis/client";
import { redisClient } from "../db/db";
import { Advertisement } from "../entity/advertisement";
import { AdvertisementGrade } from "../entity/advertisement-grade";
import { Company } from "../entity/company";
import { IAdvertisementRepository } from "../repository/advertisement/advertisement-interface";
import { ICompanyRepository } from "../repository/company/company-interface";

type CompaniesWithAdGrade = {
  company: Company;
  adGrade: AdvertisementGrade;
};

type redisType = typeof redisClient;

export class AdvertisementService {
  constructor(
    private redisClient: redisType,
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
  async getAllAdvertisingCompany(): Promise<CompaniesWithAdGrade[]> {
    const advertisingCompanyString = await this.redisClient.LRANGE(
      "advertisingCompanies",
      0,
      -1
    );

    const advertisingCompanyList: CompaniesWithAdGrade[] = [];

    if (advertisingCompanyList.length == 0) {
      const adCompaniesWithAdGrade =
        await this.getAllAdvertisingCompanyFromDB();
      for (const adCompany of adCompaniesWithAdGrade) {
        await this.redisClient.rPush(
          "advertisingCompanies",
          JSON.stringify(adCompany)
        );
      }
      return adCompaniesWithAdGrade;
    }

    for (const companyString of advertisingCompanyString) {
      advertisingCompanyList.push(JSON.parse(companyString));
    }
    return advertisingCompanyList;
  }

  async getAllAdvertisingCompanyFromDB() {
    const allAd = await this.advertisementRepo.getAllAdvertisingCompany();
    const companiesWithAdGrade: CompaniesWithAdGrade[] = [];
    for (const ad of allAd) {
      companiesWithAdGrade.push({
        company: await ad.company,
        adGrade: ad.grade,
      });
    }
    return companiesWithAdGrade;
  }
}
