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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const address_1 = require("../entity/address");
const company_1 = require("../entity/company");
const department_1 = require("../entity/department");
const tech_stack_1 = require("../entity/tech-stack");
const validation_1 = require("../middlewares/validation");
class CompanyRouter {
    constructor(companyService) {
        this.router = express_1.default.Router();
        this.companyService = companyService;
    }
    getRouter() {
        this.router.post("/", [
            express_validator_1.body("city").notEmpty(),
            express_validator_1.body("street").notEmpty(),
            express_validator_1.body("zipcode").notEmpty(),
            express_validator_1.body("nearestSubway"),
            express_validator_1.body("walkDistance").isNumeric(),
            express_validator_1.body("name").notEmpty().withMessage("이름을 입력하세요."),
            validation_1.validate,
        ], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { city, street, zipcode, nearestSubway, walkDistance, name } = req.body;
            const address = new address_1.Address();
            address.city = city;
            address.street = street;
            address.zipcode = zipcode;
            address.nearestSubway = nearestSubway;
            address.walkDistance = walkDistance;
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
        }));
        this.router.post("/department", [
            express_validator_1.body("companyName").notEmpty(),
            express_validator_1.body("departmentName").notEmpty(),
            express_validator_1.body("headCount").isNumeric(),
            express_validator_1.body("departmentType").notEmpty(),
            express_validator_1.body("techStackName").notEmpty(),
            express_validator_1.body("techStackType").notEmpty(),
            validation_1.validate,
        ], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { companyName, departmentName, headCount, departmentType, techStackName, techStackType, } = req.body;
            const department = new department_1.Department();
            department.name = departmentName;
            department.headCount = headCount;
            department.type = departmentType;
            const techStack = new tech_stack_1.TechStack();
            techStack.name = techStackName;
            techStack.type = techStackType;
            try {
                yield this.companyService.saveDepartment(companyName, department, techStack);
                res.status(201).json();
            }
            catch (e) {
                res.status(500).json({
                    msg: e,
                });
            }
        }));
        return this.router;
    }
}
exports.CompanyRouter = CompanyRouter;
