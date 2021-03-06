import { DataSource } from "typeorm";
import { createClient } from "redis";
import { AppUser } from "../entity/app-user";
import { AppUserLike } from "../entity/app-user-like";
import { Company } from "../entity/company";
import { Department } from "../entity/department";
import { MealAllowance } from "../entity/meal-allowance";
import { OfficeHours } from "../entity/office-hours";
import { RecruitmentPost } from "../entity/recruitment-post";
import { Salary } from "../entity/salary";
import { TechStack } from "../entity/tech-stack";
import { WelfareProduct } from "../entity/welfare-product";
import { Advertisement } from "../entity/advertisement";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5050,
  username: "root",
  password: "mypassword",
  database: "developer_recruitment",
  synchronize: true,
  logging: true,
  // dropSchema: true,
  entities: [
    AppUserLike,
    AppUser,
    Company,
    Department,
    MealAllowance,
    OfficeHours,
    RecruitmentPost,
    Salary,
    TechStack,
    WelfareProduct,
    Advertisement,
  ],
});

export const redisClient = createClient({
  url: "redis://default:mypassword@localhost:6380",
});

export type RedisType = ReturnType<typeof createClient>;
