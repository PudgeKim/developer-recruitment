import { DataSource, Repository } from "typeorm";
import { TechStack } from "../../entity/tech-stack";

export class TechStackRepository {
  private appDataSource: DataSource;
  private techStackRepo: Repository<TechStack>;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
  }

  public async save(techStack: TechStack): Promise<TechStack> {
    const savedTechStack = this.techStackRepo.save(techStack);
    return savedTechStack;
  }
}
