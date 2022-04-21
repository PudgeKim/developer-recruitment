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
var TechStack_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechStack = void 0;
const typeorm_1 = require("typeorm");
const department_1 = require("./department");
let TechStack = TechStack_1 = class TechStack {
    static create(name, type) {
        const techStack = new TechStack_1();
        techStack.name = name;
        techStack.type = type;
        return techStack;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TechStack.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 20 }),
    __metadata("design:type", String)
], TechStack.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 20 }),
    __metadata("design:type", String)
], TechStack.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToOne(() => department_1.Department, (department) => department.techStack),
    typeorm_1.JoinColumn({ name: "department_id" }) // 이 테이블이 외부키를 가지고 있음
    ,
    __metadata("design:type", Promise)
], TechStack.prototype, "department", void 0);
TechStack = TechStack_1 = __decorate([
    typeorm_1.Entity({ name: "tech_stack" })
], TechStack);
exports.TechStack = TechStack;
