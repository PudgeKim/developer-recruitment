import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validation";
import { CompanyController } from "../controller/company";

export class CompanyRouter {
  private router: Router = express.Router();

  constructor(private companyController: CompanyController) {}

  public getRouter(): Router {
    this.router.post(
      "/",
      [
        body("city").notEmpty(),
        body("street").notEmpty(),
        body("zipcode").notEmpty(),
        body("nearestSubway"),
        body("walkDistance").isNumeric(),
        body("name").notEmpty().withMessage("이름을 입력하세요."),
        validate,
      ],
      this.companyController.saveCompany
    );

    this.router.post(
      "/department",
      [
        body("companyName").notEmpty(),
        body("departmentName").notEmpty(),
        body("headCount").isNumeric(),
        body("departmentType").notEmpty(),
        body("techStackName").notEmpty(),
        body("techStackType").notEmpty(),
        validate,
      ],
      this.companyController.saveDepartment
    );

    return this.router;
  }
}
