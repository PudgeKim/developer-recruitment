import { DataSource, Repository } from "typeorm";
import { Advertisement } from "../../entity/advertisement";
import { Company } from "../../entity/company";

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
}
