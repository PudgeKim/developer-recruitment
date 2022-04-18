import { DataSource, Repository } from "typeorm";
import { OfficeHours } from "../../entity/office-hours";

export class OfficeHoursRepository {
  private appDataSource: DataSource;
  private repo: Repository<OfficeHours>;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.repo = this.appDataSource.getRepository(OfficeHours);
  }

  public async save(officeHours: OfficeHours): Promise<OfficeHours> {
    const savedOfficeHours = await this.repo.save(officeHours);
    return savedOfficeHours;
  }
}
