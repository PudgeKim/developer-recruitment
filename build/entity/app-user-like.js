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
exports.AppUserLike = void 0;
const typeorm_1 = require("typeorm");
const app_user_1 = require("./app-user");
const recruitment_post_1 = require("./recruitment-post");
// 사용자가 어떤 채용공고들을 좋아요 눌렀는지
let AppUserLike = class AppUserLike {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AppUserLike.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => app_user_1.AppUser, (appUser) => appUser.appUserLikes),
    __metadata("design:type", app_user_1.AppUser)
], AppUserLike.prototype, "appUser", void 0);
__decorate([
    typeorm_1.ManyToOne(() => recruitment_post_1.RecruitmentPost, (recruitmentPost) => recruitmentPost.appUserLikes),
    __metadata("design:type", recruitment_post_1.RecruitmentPost)
], AppUserLike.prototype, "recruitmentPost", void 0);
AppUserLike = __decorate([
    typeorm_1.Entity({ name: "app_user_like" })
], AppUserLike);
exports.AppUserLike = AppUserLike;
