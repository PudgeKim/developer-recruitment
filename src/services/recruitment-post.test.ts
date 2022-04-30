import { Address } from "../entity/address";
import { Company } from "../entity/company";
import { RecruitmentPost } from "../entity/recruitment-post";
import { CompanyRepository } from "../repository/company/company";
import { ICompanyRepository } from "../repository/company/company-interface";
import { recruitmentPostRepository } from "../repository/recruitment-post/recruitment-post";
import { IrecruitmentPostRepository } from "../repository/recruitment-post/recruitment-post-interface";
import { testAppDataSource } from "../test-config/test-db";
import { RecruitmentPostService } from "./recruitment-post";

let companyRepo: ICompanyRepository;
let recruitmentPostRepo: IrecruitmentPostRepository;

let recruitmentPostService: RecruitmentPostService;

beforeAll(async () => {
  await testAppDataSource
    .initialize()
    .then(() => {
      console.log("appDataSource test initialized");
    })
    .catch((err) => console.log(err));

  companyRepo = new CompanyRepository(testAppDataSource);
  recruitmentPostRepo = new recruitmentPostRepository(testAppDataSource);

  recruitmentPostService = new RecruitmentPostService(
    recruitmentPostRepo,
    companyRepo
  );
});

describe("test recruitment service", () => {
  test("save recruitmentpost", async () => {
    const address = Address.create("seoul", "songpa", "54332", "jamsil", 8);
    const company = Company.create("JM-Stream", address);
    await testAppDataSource.manager.save(company);

    const recruitmentPost = RecruitmentPost.create(
      "JM 프론트엔드 채용공고",
      "채용합니다",
      false
    );
    recruitmentPost.company = Promise.resolve(company);
    await testAppDataSource.manager.save(recruitmentPost);

    const recruitmentPost2 = RecruitmentPost.create(
      "JM 백엔드 채용공고",
      "채용합니다2",
      false
    );
    recruitmentPost2.company = Promise.resolve(company);
    await testAppDataSource.manager.save(recruitmentPost2);

    const allPost = await recruitmentPostService.getAllPostByCompanyName(
      "JM-Stream"
    );
    expect(allPost[0].title).toBe("JM 프론트엔드 채용공고");
    expect(allPost[1].title).toBe("JM 백엔드 채용공고");
  });
});
