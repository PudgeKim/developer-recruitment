"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisementCron = void 0;
const cron_1 = require("cron");
const redis_constant_1 = require("../constant-value/redis/redis-constant");
class AdvertisementCron {
    constructor(redisClient, adRepo) {
        this.redisClient = redisClient;
        this.adRepo = adRepo;
    }
    updateAdvertisementEveryMidnight() {
        const cronJob = new cron_1.CronJob("0 0 0 * * *", () => __awaiter(this, void 0, void 0, function* () {
            // 광고 하는 회사들이라고 해봤자 몇개 안될테니
            // 편리하게 전부 삭제 후 업데이트
            yield this.redisClient.del(redis_constant_1.REDIS_AD_COMPANIES_KEY);
            const adList = yield this.adRepo.getCurrentAdvertisingCompany();
            for (const ad of adList) {
                const adCompaniesWithAdGrade = {
                    companyName: (yield ad.company).name,
                    adGrade: ad.grade,
                };
                yield this.redisClient.RPUSH(redis_constant_1.REDIS_AD_COMPANIES_KEY, JSON.stringify(adCompaniesWithAdGrade));
            }
        }));
        cronJob.start();
    }
}
exports.AdvertisementCron = AdvertisementCron;
