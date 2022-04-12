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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const company_1 = require("./company");
const tech_stack_1 = require("./tech-stack");
let Department = class Department {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Department.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 20 }),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: "head_count" }),
    __metadata("design:type", Number)
], Department.prototype, "headCount", void 0);
__decorate([
    typeorm_1.Column({ length: 20 }),
    __metadata("design:type", String)
], Department.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToOne(() => tech_stack_1.TechStack, (techStack) => techStack.department),
    __metadata("design:type", tech_stack_1.TechStack)
], Department.prototype, "techStack", void 0);
__decorate([
    typeorm_1.ManyToOne(() => company_1.Company, (company) => company.departments),
    __metadata("design:type", company_1.Company)
], Department.prototype, "company", void 0);
Department = __decorate([
    typeorm_1.Entity()
], Department);
exports.Department = Department;
