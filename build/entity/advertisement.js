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
var Advertisement_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertisement = void 0;
const typeorm_1 = require("typeorm");
const advertisement_grade_1 = require("./advertisement-grade");
const company_1 = require("./company");
let Advertisement = Advertisement_1 = class Advertisement {
    static create(grade, company, startDate) {
        const advertisement = new Advertisement_1();
        advertisement.grade = grade;
        advertisement.company = Promise.resolve(company);
        startDate.setHours(24, 0, 0, 0); // 오전 12시에 시작되게 세팅
        advertisement.startDate = startDate;
        return advertisement;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Advertisement.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: advertisement_grade_1.AdvertisementGrade,
    }),
    __metadata("design:type", String)
], Advertisement.prototype, "grade", void 0);
__decorate([
    typeorm_1.Column({ name: "start_date" }),
    __metadata("design:type", Date)
], Advertisement.prototype, "startDate", void 0);
__decorate([
    typeorm_1.OneToOne(() => company_1.Company),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Promise)
], Advertisement.prototype, "company", void 0);
Advertisement = Advertisement_1 = __decorate([
    typeorm_1.Entity()
], Advertisement);
exports.Advertisement = Advertisement;
