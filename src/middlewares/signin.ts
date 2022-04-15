import { NextFunction, Request, Response } from "express";

export function checkSignedIn(req: Request, res: Response, next: NextFunction) {
  const profile: any = req.user;
  if (profile == null) {
    console.log("need to signin");
    return res.redirect("/");
  }
  next();
}
