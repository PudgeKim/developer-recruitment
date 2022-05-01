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
exports.AdvertisementRepository = void 0;
const typeorm_1 = require("typeorm");
const advertisement_1 = require("../../entity/advertisement");
const advertisement_grade_1 = require("../../entity/advertisement-grade");
class AdvertisementRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.repo = this.appDataSource.getRepository(advertisement_1.Advertisement);
    }
    save(advertisement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.save(advertisement);
        });
    }
    // 광고가 아직 진행중이지 않은 회사들도 포함
    getAllAdvertisingCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            const adList = yield this.repo.find({
                select: {
                    company: true,
                },
                relations: { company: true },
            });
            return adList;
            // const adList = await this.repo
            //   .createQueryBuilder("advertisement")
            //   .leftJoinAndSelect("advertisement.company", "company")
            //   .getMany();
            // console.log("FIRST JOIN QUERY!!");
            // return adList;
        });
    }
    // 현재 광고중인 회사들만 추출
    getCurrentAdvertisingCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            const adCompanyList = yield this.repo.find({
                where: {
                    startDate: typeorm_1.LessThan(new Date()),
                },
                relations: { company: true },
            });
            const currentAdCompanyList = [];
            const limit = new Date();
            limit.setHours(24, 0, 0, 0);
            for (const adCompany of adCompanyList) {
                const endDate = this.calculateDateByAdGrade(adCompany.startDate, adCompany.grade);
                if (endDate >= limit) {
                    currentAdCompanyList.push(adCompany);
                }
            }
            return currentAdCompanyList;
        });
    }
    calculateDateByAdGrade(startDate, adGrade) {
        let endDate = new Date();
        endDate.setHours(24, 0, 0, 0);
        switch (adGrade) {
            case advertisement_grade_1.AdvertisementGrade.SILVER:
                endDate.setDate(startDate.getDate() + 3);
            case advertisement_grade_1.AdvertisementGrade.GOLD:
                endDate.setDate(startDate.getDate() + 7);
            case advertisement_grade_1.AdvertisementGrade.PLATINUM:
                endDate.setDate(startDate.getDate() + 10);
        }
        return endDate;
    }
}
exports.AdvertisementRepository = AdvertisementRepository;
