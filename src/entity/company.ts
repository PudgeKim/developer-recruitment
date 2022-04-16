import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address";
import { Department } from "./department";
import { MealAllowance } from "./meal-allowance";
import { OfficeHours } from "./office-hours";
import { RecruitmentPost } from "./recruitment-post";
import { Salary } from "./salary";
import { WelfareProduct } from "./welfare-product";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  name: string;

  @Column(() => Address)
  address: Address;

  @OneToMany(
    () => RecruitmentPost,
    (recruitmentPost) => recruitmentPost.company
  )
  recruitmentPosts: Promise<RecruitmentPost[]>;

  @OneToMany(() => Department, (department) => department.company)
  departments: Promise<Department[]>;

  @OneToMany(() => OfficeHours, (officeHours) => officeHours.company)
  officeHoursList: Promise<Department[]>;

  @OneToOne(() => Salary, (salary) => salary.company)
  salary: Promise<Salary>;

  @OneToMany(() => WelfareProduct, (welfareProduct) => welfareProduct.company)
  welfareProducts: Promise<WelfareProduct[]>;

  @OneToOne(() => MealAllowance, (mealAllowance) => mealAllowance.company)
  mealAllowance: Promise<MealAllowance>;
}