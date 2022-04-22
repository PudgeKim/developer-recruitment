"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
class AuthRouter {
    constructor(userService) {
        this.router = express_1.default.Router();
        this.userService = userService;
    }
    getRouter() {
        this.router.get("/auth/google", passport_1.default.authenticate("google", {
            scope: ["email"],
        }));
        this.router.get("/auth/google/callback", passport_1.default.authenticate("google", {
            failureRedirect: "/failure",
            successRedirect: "/",
            session: true, // 사용자가 구글 로그인한 이후 세션정보를 쿠키에 저장하기 위함
        }), (req, res) => {
            const profile = req.user;
            console.log("authRouter profile: ", profile);
        });
        this.router.get("/auth/signout", (req, res) => {
            req.logout(); // remove req.user & clear logged in session
            return res.redirect("/");
        });
        return this.router;
    }
}
exports.AuthRouter = AuthRouter;
// authRouter.get("/failure", (req, res) => {});
