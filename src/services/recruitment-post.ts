import { RecruitmentPost } from "../entity/recruitment-post";
import { ICompanyRepository } from "../repository/company/company-interface";
import { IrecruitmentPostRepository } from "../repository/recruitment-post/recruitment-post-interface";

export class RecruitmentPostService {
  constructor(
    private recruitmentPostRepo: IrecruitmentPostRepository,
    private companyRepo: ICompanyRepository
  ) {}

  async save(recruitmentPost: RecruitmentPost) {
    return this.recruitmentPostRepo.save(recruitmentPost);
  }

  // async getAllPostByCompanyName(companyName: string) {
  //   const company = await this.companyRepo.findByName(companyName);
  //   if (company == null) {
  //     throw new Error("company not found");
  //   }

  //   const allPost = await company.recruitmentPosts;
  //   return allPost;
  // }

  async getAllPostByCompanyName(companyName: string) {
    const allPost = await this.recruitmentPostRepo.getAllPostByCompanyName(
      companyName
    );
    return allPost;
  }
}
