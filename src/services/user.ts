import { AppUser } from "../entity/app-user";
import { IUserRepository } from "../repository/user/user-interface";

export class UserService {
  userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  async save(email: string): Promise<AppUser> {
    const user = new AppUser();
    user.email = email;

    const savedUser = await this.userRepo.save(user);
    return savedUser;
  }

  async findById(id: number): Promise<AppUser | null> {
    const user: AppUser | null = await this.userRepo.findById(id);
    return user;
  }

  async saveIfNotStored(email: string): Promise<AppUser> {
    const user: AppUser | null = await this.userRepo.findByEmail(email);
    if (user == null) {
      const savedUser = await this.save(email);
      return savedUser;
    } else {
      return user;
    }
  }
}
