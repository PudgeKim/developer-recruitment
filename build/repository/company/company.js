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
exports.CompanyRepository = void 0;
const company_1 = require("../../entity/company");
class CompanyRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.companyRepo = this.appDataSource.getRepository(company_1.Company);
    }
    save(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedCompany = yield this.companyRepo.save(company);
            return savedCompany;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepo.findOneBy({
                id: id,
            });
            return company;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepo.findOneBy({
                name: name,
            });
            return company;
        });
    }
}
exports.CompanyRepository = CompanyRepository;
