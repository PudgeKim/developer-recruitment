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
exports.Salary = void 0;
const typeorm_1 = require("typeorm");
const company_1 = require("./company");
let Salary = class Salary {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Salary.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Salary.prototype, "career", void 0);
__decorate([
    typeorm_1.Column({ name: "min_salary" }),
    __metadata("design:type", Number)
], Salary.prototype, "minSalary", void 0);
__decorate([
    typeorm_1.Column({ name: "max_salary" }),
    __metadata("design:type", Number)
], Salary.prototype, "maxSalary", void 0);
__decorate([
    typeorm_1.Column({ name: "is_inclusive" }),
    __metadata("design:type", Boolean)
], Salary.prototype, "isInclusive", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_1.Company, (company) => company.salary),
    typeorm_1.JoinColumn({ name: "company_id" }) // 이 테이블이 외부키 가지고 있음
    ,
    __metadata("design:type", company_1.Company)
], Salary.prototype, "company", void 0);
Salary = __decorate([
    typeorm_1.Entity()
], Salary);
exports.Salary = Salary;
