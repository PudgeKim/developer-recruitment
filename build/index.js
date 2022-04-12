"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const app_user_1 = require("./entity/app-user");
const app_user_like_1 = require("./entity/app-user-like");
const company_1 = require("./entity/company");
const department_1 = require("./entity/department");
const meal_allowance_1 = require("./entity/meal-allowance");
const office_hours_1 = require("./entity/office-hours");
const recruitment_post_1 = require("./entity/recruitment-post");
const salary_1 = require("./entity/salary");
const tech_stack_1 = require("./entity/tech-stack");
const welfare_product_1 = require("./entity/welfare-product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5050,
    username: "root",
    password: "mypassword",
    database: "developer_recruitment",
    synchronize: true,
    logging: true,
    entities: [
        app_user_like_1.AppUserLike,
        app_user_1.AppUser,
        company_1.Company,
        department_1.Department,
        meal_allowance_1.MealAllowance,
        office_hours_1.OfficeHours,
        recruitment_post_1.RecruitmentPost,
        salary_1.Salary,
        tech_stack_1.TechStack,
        welfare_product_1.WelfareProduct,
    ],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("AppDataSource initialized");
})
    .catch((err) => console.log(err));
