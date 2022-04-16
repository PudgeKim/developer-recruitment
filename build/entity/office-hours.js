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
exports.OfficeHours = exports.Day = void 0;
const typeorm_1 = require("typeorm");
const company_1 = require("./company");
var Day;
(function (Day) {
    Day["MONDAY"] = "Monday";
    Day["TUESDAY"] = "Tuesday";
    Day["WEDNESDAY"] = "Wednesday";
    Day["THURSDAY"] = "Thrusday";
    Day["FRIDAY"] = "Friday";
    Day["SATURDAY"] = "Saturday";
    Day["SUNDAY"] = "Sunday";
})(Day = exports.Day || (exports.Day = {}));
let OfficeHours = class OfficeHours {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OfficeHours.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Day,
    }),
    __metadata("design:type", String)
], OfficeHours.prototype, "day", void 0);
__decorate([
    typeorm_1.Column({ name: "total_working_hours" }),
    __metadata("design:type", Number)
], OfficeHours.prototype, "totalWrokingHours", void 0);
__decorate([
    typeorm_1.Column({ name: "lunch_time" }),
    __metadata("design:type", Number)
], OfficeHours.prototype, "lunchTime", void 0);
__decorate([
    typeorm_1.Column({ name: "min_start_time" }),
    __metadata("design:type", Number)
], OfficeHours.prototype, "minStartTime", void 0);
__decorate([
    typeorm_1.Column({ name: "max_start_time" }),
    __metadata("design:type", Number)
], OfficeHours.prototype, "maxStartTime", void 0);
__decorate([
    typeorm_1.ManyToOne(() => company_1.Company, (company) => company.officeHoursList),
    __metadata("design:type", Promise)
], OfficeHours.prototype, "company", void 0);
OfficeHours = __decorate([
    typeorm_1.Entity({ name: "office_hours" })
], OfficeHours);
exports.OfficeHours = OfficeHours;
