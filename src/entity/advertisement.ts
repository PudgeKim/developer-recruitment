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

  @Column({ name: "start_date" })
  startDate: Date; // 광고가 시작해야할 날짜

  @OneToOne(() => Company)
  @JoinColumn()
  company: Promise<Company>;

  public static create(
    grade: AdvertisementGrade,
    company: Company,
    startDate: Date
  ): Advertisement {
    const advertisement = new Advertisement();
    advertisement.grade = grade;
    advertisement.company = Promise.resolve(company);
    startDate.setHours(24, 0, 0, 0); // 오전 12시에 시작되게 세팅
    advertisement.startDate = startDate;
    return advertisement;
  }
}
