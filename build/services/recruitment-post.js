"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentPostService = void 0;
class RecruitmentPostService {
    constructor(recruitmentPostRepo, companyRepo) {
        this.recruitmentPostRepo = recruitmentPostRepo;
        this.companyRepo = companyRepo;
    }
    save(recruitmentPost) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recruitmentPostRepo.save(recruitmentPost);
        });
    }
    getAllPostByCompanyName(companyName) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepo.findByName(companyName);
            if (company == null) {
                throw new Error("company not found");
            }
            const allPost = yield company.recruitmentPosts;
            return allPost;
        });
    }
    getPosts2(companyName) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPost = yield this.recruitmentPostRepo.getAllPostByCompanyName(companyName);
            return allPost;
        });
    }
}
exports.RecruitmentPostService = RecruitmentPostService;
