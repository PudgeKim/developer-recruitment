import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppUser } from "./app-user";
import { RecruitmentPost } from "./recruitment-post";

// 사용자가 어떤 채용공고들을 좋아요 눌렀는지
@Entity({ name: "app_user_like" })
export class AppUserLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppUser, (appUser) => appUser.appUserLikes)
  appUser: Promise<AppUser>;

  @ManyToOne(
    () => RecruitmentPost,
    (recruitmentPost) => recruitmentPost.appUserLikes
  )
  recruitmentPost: Promise<RecruitmentPost>;
}
