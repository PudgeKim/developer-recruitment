"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = require("./config/config");
const db_1 = require("./db/db");
const handlers_1 = require("./handlers");
const google_oauth_1 = require("./helpers/google-oauth");
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_1 = require("./repository/user/user");
const user_2 = require("./services/user");
const user_3 = require("./handlers/user");
const signin_1 = require("./middlewares/signin");
db_1.AppDataSource.initialize()
    .then(() => {
    console.log("AppDataSource initialized");
})
    .catch((err) => console.log(err));
const userRepo = new user_1.UserRepository(db_1.AppDataSource);
const userService = new user_2.UserService(userRepo);
const userHandler = new user_3.UserHandler(userService);
passport_1.default.use(new passport_google_oauth20_1.Strategy(google_oauth_1.OAUTH_OPTIONS, google_oauth_1.verifyCallback));
// 쿠키에 세션 저장
// (Strategy가 성공하면 발동됨)
// verifyCallback이 done(null, profile)이므로
// profile이 첫번째 인자로 넘어옴
passport_1.default.serializeUser((profile, done) => {
    // profile._json: {id, picture, email, email_verified}
    console.log("serislizeUser");
    console.log("profile: ", profile._json);
    done(null, profile._json);
});
// 쿠키로부터 세션을 읽음
// 콜백 첫번째 인자는 serializeUser의 done으로부터 넘어옴
// deserializeUser로 인해 req.user에 세팅해줌
passport_1.default.deserializeUser((profile, done) => {
    done(null, profile);
});
const PORT = 3030;
const app = express_1.default();
// app.use(helmet());
app.use(cookie_session_1.default({
    name: "session",
    maxAge: 60 * 60 * 1000,
    keys: [String(config_1.config.COOKIE_SESSION_SECRET)],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session()); // 이 middleware는 passport.deserializeUser 함수를 부른다. (req.user에 저장됨)
app.get("/", handlers_1.indexHandler);
app.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["email"],
}));
app.get("/test-user", signin_1.checkSignedIn, userHandler.save);
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true, // 사용자가 구글 로그인한 이후 세션정보를 쿠키에 저장하기 위함
}), (req, res) => {
    console.log("Google called back");
    console.log("req.user: ", req.user);
});
app.get("/failure", (req, res) => { });
app.get("/auth/signout", (req, res) => {
    req.logout(); // remove req.user & clear logged in session
    return res.redirect("/");
});
app.listen(PORT, () => {
    console.log("Server is running..");
});
// https
//   .createServer(
//     {
//       key: readFileSync("key.pem"),
//       cert: readFileSync("cert.pem"),
//     },
//     app
//   )
//   .listen(PORT, () => {
//     console.log("Server is running..");
//   });
