import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import { CompanyService } from "../services/company";
import { Address } from "../entity/address";
import { Company } from "../entity/company";
import { Department } from "../entity/department";
import { TechStack } from "../entity/tech-stack";
import { validate } from "../middlewares/validation";

export class CompanyRouter {
  private router: Router = express.Router();
  private companyService: CompanyService;

  constructor(companyService: CompanyService) {
    this.companyService = companyService;
  }

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
      async (req: Request, res: Response) => {
        const { city, street, zipcode, nearestSubway, walkDistance, name } =
          req.body;

        const address = Address.create(
          city,
          street,
          zipcode,
          nearestSubway,
          walkDistance
        );
        // const address = new Address();
        // address.city = city;
        // address.street = street;
        // address.zipcode = zipcode;
        // address.nearestSubway = nearestSubway;
        // address.walkDistance = walkDistance;

        const company = new Company();
        company.name = name;
        company.address = address;

        try {
          const savedCompany = await this.companyService.saveCompany(company);
          res.status(201).json({
            name: savedCompany.name,
          });
        } catch (e) {
          res.status(500).json({
            msg: e,
          });
        }
      }
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
      async (req: Request, res: Response) => {
        const {
          companyName,
          departmentName,
          headCount,
          departmentType,
          techStackName,
          techStackType,
        } = req.body;

        const department = Department.create(
          departmentName,
          headCount,
          departmentType
        );
        // const department = new Department();
        // department.name = departmentName;
        // department.headCount = headCount;
        // department.type = departmentType;

        const techStack = TechStack.create(techStackName, techStackType);
        // const techStack = new TechStack();
        // techStack.name = techStackName;
        // techStack.type = techStackType;

        try {
          await this.companyService.saveDepartment(
            companyName,
            department,
            techStack
          );
          res.status(201).json();
        } catch (e) {
          res.status(500).json({
            msg: e,
          });
        }
      }
    );
    return this.router;
  }
}
