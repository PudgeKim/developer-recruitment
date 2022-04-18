import { MealAllowance } from "../../entity/meal-allowance";

export interface IMealAllowanceRepository {
  save(mealAllowance: MealAllowance): Promise<MealAllowance>;
}
