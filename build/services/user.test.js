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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const app_user_1 = require("../entity/app-user");
const user_1 = require("../repository/user/user");
let appDataSource;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    appDataSource = new typeorm_1.DataSource({
        type: "postgres",
        host: "localhost",
        port: 5151,
        username: "root",
        password: "mypassword",
        database: "developer_recruitment",
        synchronize: true,
        logging: true,
        dropSchema: true,
        entities: [path_1.default.join(__dirname, "..", "entity", "*.{js,ts}")],
    });
    yield appDataSource
        .initialize()
        .then(() => {
        console.log("appDataSource test initialized");
    })
        .catch((err) => console.log(err));
}));
describe("Save user", () => {
    test("should save user and return saved user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = new user_1.UserRepository(appDataSource);
        const user = new app_user_1.AppUser();
        user.email = "sarah@gmail.com";
        let savedUser = yield userRepo.save(user);
        expect(savedUser.email).toBe("sarah@gmail.com");
    }));
});
