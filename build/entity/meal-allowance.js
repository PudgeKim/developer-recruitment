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
exports.MealAllowance = void 0;
const typeorm_1 = require("typeorm");
const company_1 = require("./company");
let MealAllowance = class MealAllowance {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MealAllowance.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "lunch_price" }),
    __metadata("design:type", Number)
], MealAllowance.prototype, "lunchPrice", void 0);
__decorate([
    typeorm_1.Column({ name: "dinner_price" }),
    __metadata("design:type", Number)
], MealAllowance.prototype, "dinnerPrice", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_1.Company, (company) => company.mealAllowance),
    typeorm_1.JoinColumn() // 외부키 소유
    ,
    __metadata("design:type", company_1.Company)
], MealAllowance.prototype, "company", void 0);
MealAllowance = __decorate([
    typeorm_1.Entity({ name: "meal_allowance" })
], MealAllowance);
exports.MealAllowance = MealAllowance;
