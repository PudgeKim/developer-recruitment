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
exports.RecruitmentPost = void 0;
const typeorm_1 = require("typeorm");
const app_user_1 = require("./app-user");
const app_user_like_1 = require("./app-user-like");
const company_1 = require("./company");
let RecruitmentPost = class RecruitmentPost {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RecruitmentPost.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 30,
    }),
    __metadata("design:type", String)
], RecruitmentPost.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ name: "is_closed" }),
    __metadata("design:type", Boolean)
], RecruitmentPost.prototype, "isClosed", void 0);
__decorate([
    typeorm_1.Column({ name: "is_published" }),
    __metadata("design:type", Boolean)
], RecruitmentPost.prototype, "isPublished", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RecruitmentPost.prototype, "views", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], RecruitmentPost.prototype, "description", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: "timestamp",
        name: "created_at",
    }),
    __metadata("design:type", Object)
], RecruitmentPost.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => app_user_like_1.AppUserLike, (appUserLike) => appUserLike.recruitmentPost),
    __metadata("design:type", Array)
], RecruitmentPost.prototype, "appUserLikes", void 0);
__decorate([
    typeorm_1.ManyToOne(() => app_user_1.AppUser, (appUser) => appUser.recruitmentPosts),
    __metadata("design:type", app_user_1.AppUser)
], RecruitmentPost.prototype, "poster", void 0);
__decorate([
    typeorm_1.ManyToOne(() => company_1.Company, (company) => company.recruitmentPosts),
    __metadata("design:type", company_1.Company)
], RecruitmentPost.prototype, "company", void 0);
RecruitmentPost = __decorate([
    typeorm_1.Entity({ name: "recruitment_post" })
], RecruitmentPost);
exports.RecruitmentPost = RecruitmentPost;
