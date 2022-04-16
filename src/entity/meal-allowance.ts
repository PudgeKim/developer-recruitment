import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company";

@Entity({ name: "meal_allowance" })
export class MealAllowance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "lunch_price" })
  lunchPrice: number;

  @Column({ name: "dinner_price" })
  dinnerPrice: number;

  @OneToOne(() => Company, (company) => company.mealAllowance)
  @JoinColumn() // 외부키 소유
  company: Promise<Company>;
}
