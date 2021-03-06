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
exports.UserService = void 0;
const app_user_1 = require("../entity/app-user");
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    save(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new app_user_1.AppUser();
            user.email = email;
            const savedUser = yield this.userRepo.save(user);
            return savedUser;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findById(id);
            return user;
        });
    }
    findByGoogleOAuthId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByGoogleOAuthId(id);
            return user;
        });
    }
    saveIfNotStored(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findByEmail(email);
            if (user == null) {
                const savedUser = yield this.save(email);
                return savedUser;
            }
            else {
                return user;
            }
        });
    }
}
exports.UserService = UserService;
