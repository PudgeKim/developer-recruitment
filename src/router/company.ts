import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import { CompanyService } from "../services/company";
import { Address } from "../entity/address";
import { Company } from "../entity/company";

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
      ],
      async (req: Request, res: Response) => {
        const { city, street, zipcode, nearestSubway, walkDistance, name } =
          req.body;

        const address = new Address();
        address.city = city;
        address.street = street;
        address.zipcode = zipcode;
        address.nearestSubway = nearestSubway;
        address.walkDistance = walkDistance;

        const company = new Company();
        company.name = name;
        company.address = address;

        try {
          const savedCompany = await this.companyService.save(company);
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

    return this.router;
  }
}
