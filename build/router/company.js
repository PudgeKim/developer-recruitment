"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validation_1 = require("../middlewares/validation");
class CompanyRouter {
    constructor(companyController) {
        this.companyController = companyController;
        this.router = express_1.default.Router();
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
        ], this.companyController.saveCompany);
        this.router.post("/department", [
            express_validator_1.body("companyName").notEmpty(),
            express_validator_1.body("departmentName").notEmpty(),
            express_validator_1.body("headCount").isNumeric(),
            express_validator_1.body("departmentType").notEmpty(),
            express_validator_1.body("techStackName").notEmpty(),
            express_validator_1.body("techStackType").notEmpty(),
            validation_1.validate,
        ], this.companyController.saveDepartment);
        return this.router;
    }
}
exports.CompanyRouter = CompanyRouter;
