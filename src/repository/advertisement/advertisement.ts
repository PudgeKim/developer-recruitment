import { DataSource, LessThan, MoreThan, Repository } from "typeorm";
import { Advertisement } from "../../entity/advertisement";
import { AdvertisementGrade } from "../../entity/advertisement-grade";

export class AdvertisementRepository {
  private appDataSource: DataSource;
  private repo: Repository<Advertisement>;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.repo = this.appDataSource.getRepository(Advertisement);
  }

  async save(advertisement: Advertisement) {
    return await this.repo.save(advertisement);
  }

  // 광고가 아직 진행중이지 않은 회사들도 포함
  async getAllAdvertisingCompany() {
    const adList = await this.repo.find({
      select: {
        company: true,
      },
      relations: { company: true },
    });

    return adList;

    // const adList = await this.repo
    //   .createQueryBuilder("advertisement")
    //   .leftJoinAndSelect("advertisement.company", "company")
    //   .getMany();

    // console.log("FIRST JOIN QUERY!!");
    // return adList;
  }

  // 현재 광고중인 회사들만 추출
  async getCurrentAdvertisingCompany() {
    const adCompanyList = await this.repo.find({
      where: {
        startDate: LessThan(new Date()),
      },
      relations: { company: true },
    });

    const currentAdCompanyList = [];

    const limit = new Date();
    limit.setHours(24, 0, 0, 0);

    for (const adCompany of adCompanyList) {
      const endDate: Date = this.calculateDateByAdGrade(
        adCompany.startDate,
        adCompany.grade
      );
      if (endDate >= limit) {
        currentAdCompanyList.push(adCompany);
      }
    }

    return currentAdCompanyList;
  }

  private calculateDateByAdGrade(
    startDate: Date,
    adGrade: AdvertisementGrade
  ): Date {
    let endDate = new Date();
    endDate.setHours(24, 0, 0, 0);

    switch (adGrade) {
      case AdvertisementGrade.SILVER:
        endDate.setDate(startDate.getDate() + 3);
      case AdvertisementGrade.GOLD:
        endDate.setDate(startDate.getDate() + 7);
      case AdvertisementGrade.PLATINUM:
        endDate.setDate(startDate.getDate() + 10);
    }
    return endDate;
  }
}
