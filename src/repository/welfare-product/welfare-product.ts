import { DataSource, Repository } from "typeorm";
import { WelfareProduct } from "../../entity/welfare-product";

export class WelfareProductRepository {
  private appDataSource: DataSource;
  private repo: Repository<WelfareProduct>;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.repo = this.appDataSource.getRepository(WelfareProduct);
  }

  public async save(welfareProduct: WelfareProduct): Promise<WelfareProduct> {
    const savedWelfareProduct = await this.repo.save(welfareProduct);
    return savedWelfareProduct;
  }
}
