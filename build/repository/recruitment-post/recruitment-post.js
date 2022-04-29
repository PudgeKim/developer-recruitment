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
exports.recruitmentPostRepository = void 0;
const recruitment_post_1 = require("../../entity/recruitment-post");
class recruitmentPostRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.repo = this.appDataSource.getRepository(recruitment_post_1.RecruitmentPost);
    }
    save(recruitmentPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedRecruitmentPost = yield this.repo.save(recruitmentPost);
            return savedRecruitmentPost;
        });
    }
    getAllPostByCompanyName(companyName) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPost = yield this.repo.find({
                where: {
                    company: { name: companyName },
                },
                relations: ["company"],
            });
            return allPost;
        });
    }
}
exports.recruitmentPostRepository = recruitmentPostRepository;
