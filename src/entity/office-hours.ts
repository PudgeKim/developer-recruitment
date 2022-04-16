import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company";

export enum Day {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thrusday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

@Entity({ name: "office_hours" })
export class OfficeHours {
  @PrimaryGeneratedColumn()
  id: number;

  // 요일마다 출/퇴근시간이 다를 수 있으므로
  // 예를 들어 월요일은 오후 1시출근
  // 금요일은 일찍 퇴근 등
  @Column({
    type: "enum",
    enum: Day,
  })
  day: Day;

  @Column({ name: "total_working_hours" })
  totalWrokingHours: number;

  @Column({ name: "lunch_time" })
  lunchTime: number; // 점심시간 몇시간인지

  // 출근시간이 탄력인 경우
  // 9~11이라면 minStartTime=9, maxStartTime=11
  @Column({ name: "min_start_time" })
  minStartTime: number;

  @Column({ name: "max_start_time" })
  maxStartTime: number;

  @ManyToOne(() => Company, (company) => company.officeHoursList)
  company: Promise<Company>;
}
