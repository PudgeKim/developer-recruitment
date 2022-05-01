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
const address_1 = require("../entity/address");
const advertisement_grade_1 = require("../entity/advertisement-grade");
const company_1 = require("../entity/company");
const advertisement_1 = require("../repository/advertisement/advertisement");
const company_2 = require("../repository/company/company");
const test_db_1 = require("../test-config/test-db");
const advertisement_2 = require("./advertisement");
let advertisementRepo;
let companyRepo;
let advertisementService;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield test_db_1.testAppDataSource
        .initialize()
        .then(() => {
        console.log("testAppDataSource intialized.");
    })
        .catch((err) => {
        console.log(err);
    });
    yield test_db_1.testRedisClient.connect();
    companyRepo = new company_2.CompanyRepository(test_db_1.testAppDataSource);
    advertisementRepo = new advertisement_1.AdvertisementRepository(test_db_1.testAppDataSource);
    advertisementService = new advertisement_2.AdvertisementService(test_db_1.testRedisClient, advertisementRepo, companyRepo);
}));
describe("test advertisementService", () => {
    test("get all advertising company", () => __awaiter(void 0, void 0, void 0, function* () {
        const address = address_1.Address.create("seoul", "songpa", "54332", "jamsil", 8);
        const company = company_1.Company.create("JM-Stream", address);
        yield test_db_1.testAppDataSource.manager.save(company);
        const address2 = address_1.Address.create("kangwon", "chuncon", "1234", "", 0);
        const company2 = company_1.Company.create("HO-Stream", address2);
        yield test_db_1.testAppDataSource.manager.save(company2);
        yield advertisementService.save(company.name, advertisement_grade_1.AdvertisementGrade.GOLD, new Date());
        yield advertisementService.save(company2.name, advertisement_grade_1.AdvertisementGrade.SILVER, new Date());
        const companyList = yield advertisementService.getAllAdvertisingCompany();
        expect(companyList[0].companyName).toBe("JM-Stream");
        expect(companyList[1].companyName).toBe("HO-Stream");
    }));
});
