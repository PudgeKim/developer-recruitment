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
exports.AppUser = void 0;
const typeorm_1 = require("typeorm");
const app_user_like_1 = require("./app-user-like");
const recruitment_post_1 = require("./recruitment-post");
let AppUser = class AppUser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AppUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true, name: "google_oauth_id" }),
    __metadata("design:type", String)
], AppUser.prototype, "googleOAuthId", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], AppUser.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToMany(() => recruitment_post_1.RecruitmentPost, (recruitmentPost) => recruitmentPost.poster),
    __metadata("design:type", Promise)
], AppUser.prototype, "recruitmentPosts", void 0);
__decorate([
    typeorm_1.OneToMany(() => app_user_like_1.AppUserLike, (appUserLike) => appUserLike.appUser),
    __metadata("design:type", Promise)
], AppUser.prototype, "appUserLikes", void 0);
AppUser = __decorate([
    typeorm_1.Entity({ name: "app_user" })
], AppUser);
exports.AppUser = AppUser;
