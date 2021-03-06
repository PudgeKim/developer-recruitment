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
exports.Address = void 0;
const typeorm_1 = require("typeorm");
class Address {
    static create(city, street, zipcode, nearestSubway, walkDistance) {
        const address = new Address();
        address.city = city;
        address.street = street;
        address.zipcode = zipcode;
        address.nearestSubway = nearestSubway;
        address.walkDistance = walkDistance;
        return address;
    }
}
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Address.prototype, "zipcode", void 0);
__decorate([
    typeorm_1.Column({ name: "nearest_subway", nullable: true, length: 15 }),
    __metadata("design:type", String)
], Address.prototype, "nearestSubway", void 0);
__decorate([
    typeorm_1.Column({ name: "walk_distance", nullable: true }),
    __metadata("design:type", Number)
], Address.prototype, "walkDistance", void 0);
exports.Address = Address;
