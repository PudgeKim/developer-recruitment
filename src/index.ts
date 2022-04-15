import https from "https";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "./config/config";
import { AppDataSource } from "./db/db";
import { indexHandler } from "./handlers";
import { OAUTH_OPTIONS, verifyCallback } from "./helpers/google-oauth";
import cookieSession from "cookie-session";
import { UserRepository } from "./repository/user/user";
import { UserService } from "./services/user";
import { UserHandler } from "./handlers/user";
import { checkSignedIn } from "./middlewares/signin";

AppDataSource.initialize()
  .then(() => {
    console.log("AppDataSource initialized");
  })
  .catch((err) => console.log(err));

const userRepo = new UserRepository(AppDataSource);
const userService = new UserService(userRepo);
const userHandler = new UserHandler(userService);

passport.use(new Strategy(OAUTH_OPTIONS, verifyCallback));

// 쿠키에 세션 저장
// (Strategy가 성공하면 발동됨)
// verifyCallback이 done(null, profile)이므로
// profile이 첫번째 인자로 넘어옴
passport.serializeUser((profile: any, done) => {
  // profile._json: {id, picture, email, email_verified}
  console.log("serislizeUser");
  console.log("profile: ", profile._json);
  done(null, profile._json);
});

// 쿠키로부터 세션을 읽음
// 콜백 첫번째 인자는 serializeUser의 done으로부터 넘어옴
// deserializeUser로 인해 req.user에 세팅해줌
passport.deserializeUser((profile: any, done) => {
  done(null, profile);
});

const PORT = 3030;
const app: Express = express();

// app.use(helmet());
app.use(
  cookieSession({
    name: "session", // 쿠키의 키 이름
    maxAge: 60 * 60 * 1000, // 1 hour
    keys: [String(config.COOKIE_SESSION_SECRET)],
  })
);
app.use(passport.initialize());
app.use(passport.session()); // 이 middleware는 passport.deserializeUser 함수를 부른다. (req.user에 저장됨)

app.get("/", indexHandler);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get("/test-user", checkSignedIn, userHandler.save);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true, // 사용자가 구글 로그인한 이후 세션정보를 쿠키에 저장하기 위함
  }),
  (req, res) => {
    console.log("Google called back");
    console.log("req.user: ", req.user);
  }
);

app.get("/failure", (req, res) => {});

app.get("/auth/signout", (req: Request, res: Response) => {
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
