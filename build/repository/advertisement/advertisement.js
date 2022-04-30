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
const advertisement_1 = require("../../entity/advertisement");
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
}
exports.AdvertisementRepository = AdvertisementRepository;
