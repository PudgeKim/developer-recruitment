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
const company_1 = require("../entity/company");
const recruitment_post_1 = require("../entity/recruitment-post");
const company_2 = require("../repository/company/company");
const recruitment_post_2 = require("../repository/recruitment-post/recruitment-post");
const test_db_1 = require("../test-config/test-db");
const recruitment_post_3 = require("./recruitment-post");
let companyRepo;
let recruitmentPostRepo;
let recruitmentPostService;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield test_db_1.testAppDataSource
        .initialize()
        .then(() => {
        console.log("appDataSource test initialized");
    })
        .catch((err) => console.log(err));
    companyRepo = new company_2.CompanyRepository(test_db_1.testAppDataSource);
    recruitmentPostRepo = new recruitment_post_2.recruitmentPostRepository(test_db_1.testAppDataSource);
    recruitmentPostService = new recruitment_post_3.RecruitmentPostService(recruitmentPostRepo, companyRepo);
}));
describe("test recruitment service", () => {
    test("save recruitmentpost", () => __awaiter(void 0, void 0, void 0, function* () {
        const address = address_1.Address.create("seoul", "songpa", "54332", "jamsil", 8);
        const company = company_1.Company.create("JM-Stream", address);
        yield test_db_1.testAppDataSource.manager.save(company);
        const recruitmentPost = recruitment_post_1.RecruitmentPost.create("JM 프론트엔드 채용공고", "채용합니다", false);
        recruitmentPost.company = Promise.resolve(company);
        yield test_db_1.testAppDataSource.manager.save(recruitmentPost);
        const recruitmentPost2 = recruitment_post_1.RecruitmentPost.create("JM 백엔드 채용공고", "채용합니다2", false);
        recruitmentPost2.company = Promise.resolve(company);
        yield test_db_1.testAppDataSource.manager.save(recruitmentPost2);
        const allPost = yield recruitmentPostService.getAllPostByCompanyName("JM-Stream");
        expect(allPost[0].title).toBe("JM 프론트엔드 채용공고");
        expect(allPost[1].title).toBe("JM 백엔드 채용공고");
    }));
});
