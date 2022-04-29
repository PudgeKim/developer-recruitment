import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdvertisementGrade } from "./advertisement-grade";
import { Company } from "./company";

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: AdvertisementGrade,
  })
  grade: AdvertisementGrade;

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
}
