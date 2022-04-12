import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppUser } from "./app-user";
import { AppUserLike } from "./app-user-like";
import { Company } from "./company";

@Entity({ name: "recruitment_post" })
export class RecruitmentPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  title: string;

  @Column({ name: "is_closed" })
  isClosed: boolean; // 채용마감여부

  @Column({ name: "is_published" })
  isPublished: boolean;

  @Column()
  views: number; // 몇명의 지원자가 채용공고를 보았는지

  @Column("text")
  description: string;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
  })
  createdAt: Date | undefined;

  @OneToMany(() => AppUserLike, (appUserLike) => appUserLike.recruitmentPost)
  appUserLikes: AppUserLike[];

  @ManyToOne(() => AppUser, (appUser) => appUser.recruitmentPosts)
  poster: AppUser;

  // ManyToOne으로 company 작성해야함
  @ManyToOne(() => Company, (company) => company.recruitmentPosts)
  company: Company;
}
