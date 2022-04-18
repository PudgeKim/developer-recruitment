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
  createdAt: Date;

  @OneToMany(() => AppUserLike, (appUserLike) => appUserLike.recruitmentPost)
  appUserLikes: Promise<AppUserLike[]>;

  @ManyToOne(() => AppUser, (appUser) => appUser.recruitmentPosts)
  poster: Promise<AppUser>;

  @ManyToOne(() => Company, (company) => company.recruitmentPosts)
  company: Promise<Company>;
}
