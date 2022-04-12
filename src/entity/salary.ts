import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company";

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  career: number; // 경력 연차 (신입은=0)

  @Column({ name: "min_salary" })
  minSalary: number;

  @Column({ name: "max_salary" })
  maxSalary: number;

  @Column({ name: "is_inclusive" })
  isInclusive: boolean; // 포괄임금제 여부

  @OneToOne(() => Company, (company) => company.salary)
  @JoinColumn({ name: "company_id" }) // 이 테이블이 외부키 가지고 있음
  company: Company;
}
