import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "./department";

@Entity({ name: "tech_stack" })
export class TechStack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string; // 기술 이름 (git, python, react ..)

  @Column({ length: 20 })
  type: string; // 기술 종류 (programming language, webframework, CI/CD ...)

  @OneToOne(() => Department, (department) => department.techStack)
  @JoinColumn({ name: "department_id" }) // 이 테이블이 외부키를 가지고 있음
  department: Promise<Department>;
}
