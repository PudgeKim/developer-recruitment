import { AppUser } from "../../entity/app-user";

export type UserErrorState = {
  state: "fail";
  reason: "duplicated" | "else";
};

export interface IUserRepository {
  save(user: AppUser): Promise<AppUser>;
  findById(id: number): Promise<AppUser | null>;
  findByEmail(email: string): Promise<AppUser | null>;
}
