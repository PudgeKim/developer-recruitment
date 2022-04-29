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
exports.CompanyController = void 0;
const address_1 = require("../entity/address");
const company_1 = require("../entity/company");
const department_1 = require("../entity/department");
const tech_stack_1 = require("../entity/tech-stack");
class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    saveCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { city, street, zipcode, nearestSubway, walkDistance, name } = req.body;
            const address = address_1.Address.create(city, street, zipcode, nearestSubway, walkDistance);
            const company = new company_1.Company();
            company.name = name;
            company.address = address;
            try {
                const savedCompany = yield this.companyService.saveCompany(company);
                res.status(201).json({
                    name: savedCompany.name,
                });
            }
            catch (e) {
                res.status(500).json({
                    msg: e,
                });
            }
        });
    }
    saveDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { companyName, departmentName, headCount, departmentType, techStackName, techStackType, } = req.body;
                const department = department_1.Department.create(departmentName, headCount, departmentType);
                const techStack = tech_stack_1.TechStack.create(techStackName, techStackType);
                try {
                    yield this.companyService.saveDepartment(companyName, department, techStack);
                    res.status(201).json();
                }
                catch (e) {
                    res.status(500).json({
                        msg: e,
                    });
                }
            });
        });
    }
}
exports.CompanyController = CompanyController;
