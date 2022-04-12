"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const address_1 = require("./address");
const department_1 = require("./department");
const meal_allowance_1 = require("./meal-allowance");
const office_hours_1 = require("./office-hours");
const recruitment_post_1 = require("./recruitment-post");
const salary_1 = require("./salary");
const welfare_product_1 = require("./welfare-product");
let Company = class Company {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true, length: 30 }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(() => address_1.Address),
    __metadata("design:type", address_1.Address)
], Company.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(() => recruitment_post_1.RecruitmentPost, (recruitmentPost) => recruitmentPost.company),
    __metadata("design:type", Array)
], Company.prototype, "recruitmentPosts", void 0);
__decorate([
    typeorm_1.OneToMany(() => department_1.Department, (department) => department.company),
    __metadata("design:type", Array)
], Company.prototype, "departments", void 0);
__decorate([
    typeorm_1.OneToMany(() => office_hours_1.OfficeHours, (officeHours) => officeHours.company),
    __metadata("design:type", Array)
], Company.prototype, "officeHoursList", void 0);
__decorate([
    typeorm_1.OneToOne(() => salary_1.Salary, (salary) => salary.company),
    __metadata("design:type", salary_1.Salary)
], Company.prototype, "salary", void 0);
__decorate([
    typeorm_1.OneToMany(() => welfare_product_1.WelfareProduct, (welfareProduct) => welfareProduct.company),
    __metadata("design:type", Array)
], Company.prototype, "welfareProducts", void 0);
__decorate([
    typeorm_1.OneToOne(() => meal_allowance_1.MealAllowance, (mealAllowance) => mealAllowance.company),
    __metadata("design:type", meal_allowance_1.MealAllowance)
], Company.prototype, "mealAllowance", void 0);
Company = __decorate([
    typeorm_1.Entity()
], Company);
exports.Company = Company;
