import { Request, Response } from "express";
import { UserService } from "../services/user";

export class UserHandler {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async save(req: Request, res: Response) {
    const profile: any = req.user;
    const email = String(profile.email);
    const user = await this.userService.saveIfNotStored(email);
  }
}
