import { Address } from "../entity/address";
import { Advertisement } from "../entity/advertisement";
import { AdvertisementGrade } from "../entity/advertisement-grade";
import { Company } from "../entity/company";
import { AdvertisementRepository } from "../repository/advertisement/advertisement";
import { CompanyRepository } from "../repository/company/company";
import { testAppDataSource } from "../test-config/test-db";
import { AdvertisementService } from "./advertisement";

let advertisementRepo: AdvertisementRepository;
let companyRepo: CompanyRepository;
let advertisementService: AdvertisementService;

beforeAll(async () => {
  await testAppDataSource
    .initialize()
    .then(() => {
      console.log("testAppDataSource intialized.");
    })
    .catch((err) => {
      console.log(err);
    });

  advertisementRepo = new AdvertisementRepository(testAppDataSource);
  advertisementService = new AdvertisementService(
    advertisementRepo,
    companyRepo
  );
});

describe("test advertisementService", () => {
  test("get all advertising company", async () => {
    const address = Address.create("seoul", "songpa", "54332", "jamsil", 8);
    const company = Company.create("JM-Stream", address);
    await testAppDataSource.manager.save(company);

    const address2 = Address.create("kangwon", "chuncon", "1234", "", 0);
    const company2 = Company.create("HO-Stream", address2);
    await testAppDataSource.manager.save(company2);

    const advertisement = Advertisement.create(
      AdvertisementGrade.GOLD,
      company
    );
    await testAppDataSource.manager.save(advertisement);

    const advertisement2 = Advertisement.create(
      AdvertisementGrade.SILVER,
      company2
    );
    await testAppDataSource.manager.save(advertisement2);

    const companyList = await advertisementService.getAllAdvertisingCompany();
    console.log("companyList: ", companyList);
  });
});
