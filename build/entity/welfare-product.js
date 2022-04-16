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
exports.WelfareProduct = void 0;
const typeorm_1 = require("typeorm");
const company_1 = require("./company");
// 복지로 나오는 물품들
// 예를 들면 허먼밀러 의자, 4k모니터 등
let WelfareProduct = class WelfareProduct {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WelfareProduct.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WelfareProduct.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WelfareProduct.prototype, "brand", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WelfareProduct.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => company_1.Company, (company) => company.welfareProducts),
    __metadata("design:type", Promise)
], WelfareProduct.prototype, "company", void 0);
WelfareProduct = __decorate([
    typeorm_1.Entity({ name: "welfare_product" })
], WelfareProduct);
exports.WelfareProduct = WelfareProduct;
