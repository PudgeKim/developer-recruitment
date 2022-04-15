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
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let appDataSource;
beforeAll(() => {
    appDataSource = new typeorm_1.DataSource({
        type: "better-sqlite3",
        database: ":memory:",
        synchronize: true,
        entities: ["entity/*.ts"],
    });
});
describe("Save user", () => {
    test("should save user and return saved user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = new user_1.UserRepository(appDataSource);
        let savedUser = yield userRepo.save("kim@gmail.com");
        expect(savedUser.email).toBe("kim@gmail.com");
    }));
});
