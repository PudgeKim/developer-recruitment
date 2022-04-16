import { DataSource } from "typeorm";
import { AppUser } from "../../entity/app-user";
import { AppUserLike } from "../../entity/app-user-like";
import { Company } from "../../entity/company";
import { Department } from "../../entity/department";
import { MealAllowance } from "../../entity/meal-allowance";
import { OfficeHours } from "../../entity/office-hours";
import { RecruitmentPost } from "../../entity/recruitment-post";
import { Salary } from "../../entity/salary";
import { TechStack } from "../../entity/tech-stack";
import { WelfareProduct } from "../../entity/welfare-product";
import { UserRepository } from "./user";

let appDataSource: DataSource;

beforeAll(() => {
  appDataSource = new DataSource({
    type: "better-sqlite3",
    database: ":memory:",
    synchronize: true,
    entities: ["entity/*.ts"],
  });
});

describe("Save user", () => {
  test("should save user and return saved user", async () => {
    const userRepo = new UserRepository(appDataSource);
    const user = new AppUser();
    user.email = "kim@gmail.com";
    let savedUser: AppUser = await userRepo.save(user);

    expect(savedUser.email).toBe("kim@gmail.com");
  });
});
