import { CronJob } from "cron";
import { REDIS_AD_COMPANIES_KEY } from "../constant-value/redis/redis-constant";
import { RedisType } from "../db/db";
import { Advertisement } from "../entity/advertisement";
import { IAdvertisementRepository } from "../repository/advertisement/advertisement-interface";
import { AdCompanyWithAdGrade } from "../types/advertising-company";

export class AdvertisementCron {
  constructor(
    private redisClient: RedisType,
    private adRepo: IAdvertisementRepository
  ) {}

  updateAdvertisementEveryMidnight() {
    const cronJob = new CronJob("0 0 0 * * *", async () => {
      // 광고 하는 회사들이라고 해봤자 몇개 안될테니
      // 편리하게 전부 삭제 후 업데이트
      await this.redisClient.del(REDIS_AD_COMPANIES_KEY);

      const adList: Advertisement[] =
        await this.adRepo.getCurrentAdvertisingCompany();

      for (const ad of adList) {
        const adCompaniesWithAdGrade: AdCompanyWithAdGrade = {
          companyName: (await ad.company).name,
          adGrade: ad.grade,
        };

        await this.redisClient.RPUSH(
          REDIS_AD_COMPANIES_KEY,
          JSON.stringify(adCompaniesWithAdGrade)
        );
      }
    });

    cronJob.start();
  }
}
