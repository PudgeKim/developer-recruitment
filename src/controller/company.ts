import { Request, Response } from "express";
import { Address } from "../entity/address";
import { Company } from "../entity/company";
import { Department } from "../entity/department";
import { TechStack } from "../entity/tech-stack";
import { CompanyService } from "../services/company";

export class CompanyController {
  constructor(private companyService: CompanyService) {}

  async saveCompany(req: Request, res: Response) {
    const { city, street, zipcode, nearestSubway, walkDistance, name } =
      req.body;

    const address = Address.create(
      city,
      street,
      zipcode,
      nearestSubway,
      walkDistance
    );

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

  async saveDepartment(req: Request, res: Response) {
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

      const techStack = TechStack.create(techStackName, techStackType);

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
    };
  }
}
