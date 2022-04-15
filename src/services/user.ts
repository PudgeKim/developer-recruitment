import { AppUser } from "../entity/app-user";
import { UserRepository } from "../repository/user/user";

export class UserService {
  userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async save(email: string): Promise<AppUser> {
    const user = await this.userRepo.save(email);
    return user;
  }

  async findById(id: number): Promise<AppUser | null> {
    const user: AppUser | null = await this.userRepo.find(id);
    return user;
  }

  async saveIfNotStored(email: string): Promise<AppUser> {
    const user: AppUser | null = await this.userRepo.findByEmail(email);
    if (user == null) {
      const savedUser = await this.userRepo.save(email);
      return savedUser;
    } else {
      return user;
    }
  }
}
