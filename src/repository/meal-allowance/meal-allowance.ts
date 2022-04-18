import { DataSource, Repository } from "typeorm";
import { MealAllowance } from "../../entity/meal-allowance";

export class MealAllowanceRepository {
  private appDataSource: DataSource;
  private repo: Repository<MealAllowance>;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.repo = this.appDataSource.getRepository(MealAllowance);
  }

  public async save(mealAllowance: MealAllowance): Promise<MealAllowance> {
    const savedMealAllowance = await this.repo.save(mealAllowance);
    return savedMealAllowance;
  }
}
