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
exports.AdvertisementService = void 0;
const advertisement_1 = require("../entity/advertisement");
class AdvertisementService {
    constructor(advertisementRepo, companyRepo) {
        this.advertisementRepo = advertisementRepo;
        this.companyRepo = companyRepo;
    }
    save(companyName, advertisementGrade) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepo.findByName(companyName);
            if (company == null) {
                throw new Error("company not found");
            }
            const advertisement = advertisement_1.Advertisement.create(advertisementGrade, company);
            yield this.advertisementRepo.save(advertisement);
        });
    }
    getAllAdvertisingCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            const allAd = yield this.advertisementRepo.getAllAdvertisingCompany();
            const companiesWithAdGrade = [];
            for (const ad of allAd) {
                companiesWithAdGrade.push({
                    company: yield ad.company,
                    adGrade: ad.grade,
                });
            }
            return companiesWithAdGrade;
        });
    }
}
exports.AdvertisementService = AdvertisementService;
