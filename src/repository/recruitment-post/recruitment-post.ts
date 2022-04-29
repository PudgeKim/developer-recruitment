import { DataSource, Repository } from "typeorm";
import { Company } from "../../entity/company";
import { RecruitmentPost } from "../../entity/recruitment-post";

export class recruitmentPostRepository {
  private appDataSource: DataSource;
  private repo: Repository<RecruitmentPost>;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.repo = this.appDataSource.getRepository(RecruitmentPost);
  }

  async save(recruitmentPost: RecruitmentPost): Promise<RecruitmentPost> {
    const savedRecruitmentPost: RecruitmentPost = await this.repo.save(
      recruitmentPost
    );
    return savedRecruitmentPost;
  }

  async getAllPostByCompanyName(companyName: string) {
    const allPost: RecruitmentPost[] = await this.repo.find({
      where: {
        company: { name: companyName },
      },
      relations: ["company"],
    });

    return allPost;
  }
}
