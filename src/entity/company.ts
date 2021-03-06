import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address";
import { Advertisement } from "./advertisement";
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

  @OneToOne(() => Advertisement, (advertisement) => advertisement.company)
  advertisement: Promise<Advertisement>;

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

  public static create(name: string, address: Address): Company {
    const company = new Company();
    company.name = name;
    company.address = address;
    return company;
  }
}
