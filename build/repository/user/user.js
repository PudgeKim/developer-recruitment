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
exports.UserRepository = void 0;
const app_user_1 = require("../../entity/app-user");
class UserRepository {
    constructor(appDataSource) {
        this.appDataSource = appDataSource;
        this.userRepo = this.appDataSource.getRepository(app_user_1.AppUser);
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedUser = yield this.userRepo.save(user);
            return savedUser;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOneBy({
                id: id,
            });
            return user;
        });
    }
    findByGoogleOAuthId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOneBy({
                googleOAuthId: id,
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOneBy({
                email: email,
            });
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
