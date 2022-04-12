import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppUserLike } from "./app-user-like";
import { RecruitmentPost } from "./recruitment-post";

@Entity({ name: "app_user" })
export class AppUser {
  @PrimaryGeneratedColumn()
  id: string; // google oauth id

  @Column({ unique: true })
  email: string;

  @OneToMany(() => RecruitmentPost, (recruitmentPost) => recruitmentPost.poster)
  recruitmentPosts: RecruitmentPost[];

  @OneToMany(() => AppUserLike, (appUserLike) => appUserLike.appUser)
  appUserLikes: AppUserLike[];
}
