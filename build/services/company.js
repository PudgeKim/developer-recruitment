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
exports.CompanyService = void 0;
class CompanyService {
    constructor(appDataSource, companyRepo, departmentRepo, techStackRepo, officeHoursRepo, mealAllowanceRepo, welfareProductRepo) {
        this.appDataSource = appDataSource;
        this.companyRepo = companyRepo;
        this.departmentRepo = departmentRepo;
        this.techStackRepo = techStackRepo;
        this.officeHoursRepo = officeHoursRepo;
        this.mealAllowanceRepo = mealAllowanceRepo;
        this.welfareProductRepo = welfareProductRepo;
    }
    saveCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedCompany = yield this.companyRepo.save(company);
            return savedCompany;
        });
    }
    findCompany(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepo.findByName(name);
            return company;
        });
    }
    saveDepartment(companyName, department, techStack) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepo.findByName(companyName);
            if (company == null) {
                throw new Error("Not Found");
            }
            // 다중 쿼리이므로 transaction 사용
            yield this.appDataSource.transaction(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const savedTechStack = yield this.saveTechStack(techStack);
                    department.techStack = Promise.resolve(savedTechStack);
                    const savedDepartment = yield this.departmentRepo.save(department);
                    company.departments = Promise.resolve([savedDepartment]);
                    yield this.companyRepo.save(company);
                }
                catch (e) {
                    console.log("companyService transaction error: ", e);
                }
            }));
        });
    }
    saveTechStack(techStack) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedTechStack = yield this.techStackRepo.save(techStack);
            return savedTechStack;
        });
    }
    saveOfficeHours(officeHours) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.officeHoursRepo.save(officeHours);
        });
    }
    saveWelfareProduct(welfareProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.welfareProductRepo.save(welfareProduct);
        });
    }
    saveMealAllowance(mealAllowance) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mealAllowanceRepo.save(mealAllowance);
        });
    }
}
exports.CompanyService = CompanyService;
