import { RecruitmentPost } from "../../entity/recruitment-post";

export interface IrecruitmentPostRepository {
  save(recruitmentPost: RecruitmentPost): Promise<RecruitmentPost>;
  getAllPostByCompanyName(companyName: string): Promise<RecruitmentPost[]>;
}
