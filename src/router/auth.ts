import express, { Request, Response, Router } from "express";
import passport from "passport";
import { UserService } from "../services/user";

export class AuthRouter {
  private router: Router = express.Router();
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getRouter(): Router {
    this.router.get(
      "/auth/google",
      passport.authenticate("google", {
        scope: ["email"],
      })
    );

    this.router.get(
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

    this.router.get("/auth/signout", (req: Request, res: Response) => {
      req.logout(); // remove req.user & clear logged in session
      return res.redirect("/");
    });

    return this.router;
  }
}

// authRouter.get("/failure", (req, res) => {});
