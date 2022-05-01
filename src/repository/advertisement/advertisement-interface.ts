import { Advertisement } from "../../entity/advertisement";

export interface IAdvertisementRepository {
  save(advertisement: Advertisement): Promise<Advertisement>;
  getAllAdvertisingCompany(): Promise<Advertisement[]>;
  getCurrentAdvertisingCompany(): Promise<Advertisement[]>;
}
