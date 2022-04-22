import { DataSource, Repository } from "typeorm";
import { AppUser } from "../../entity/app-user";

export class UserRepository {
  private userRepo: Repository<AppUser>;
  private appDataSource: DataSource;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.userRepo = this.appDataSource.getRepository(AppUser);
  }

  public async save(user: AppUser): Promise<AppUser> {
    const savedUser: AppUser = await this.userRepo.save(user);
    return savedUser;
  }

  public async findById(id: number): Promise<AppUser | null> {
    const user: AppUser | null = await this.userRepo.findOneBy({
      id: id,
    });
    return user;
  }

  public async findByGoogleOAuthId(id: string): Promise<AppUser | null> {
    const user: AppUser | null = await this.userRepo.findOneBy({
      googleOAuthId: id,
    });
    return user;
  }

  public async findByEmail(email: string): Promise<AppUser | null> {
    const user: AppUser | null = await this.userRepo.findOneBy({
      email: email,
    });
    return user;
  }
}
