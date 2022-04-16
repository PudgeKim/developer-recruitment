import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company";
import { TechStack } from "./tech-stack";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ name: "head_count" })
  headCount: number; // 인원 수

  @Column({ length: 20 })
  type: string; // 백엔드 부서인지, 프론트엔드 부서인지, DevOps인지 등

  @OneToOne(() => TechStack, (techStack) => techStack.department)
  techStack: Promise<TechStack>;

  @ManyToOne(() => Company, (company) => company.departments)
  company: Promise<Company>;
}
