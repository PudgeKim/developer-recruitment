import { AppUser } from "../../entity/app-user";

export type UserErrorState = {
  state: "fail";
  reason: "duplicated" | "else";
};

interface IUserRepository {
  save(email: string): Promise<AppUser>;
}
