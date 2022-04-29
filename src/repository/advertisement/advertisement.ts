import { DataSource, Repository } from "typeorm";
import { Advertisement } from "../../entity/advertisement";

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
}
