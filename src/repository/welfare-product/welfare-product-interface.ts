import { WelfareProduct } from "../../entity/welfare-product";

export interface IWellfareProductRepository {
  save(welfareProduct: WelfareProduct): Promise<WelfareProduct>;
}
