import { Address } from "../entity/address";
import { AdvertisementGrade } from "../entity/advertisement-grade";
import { Company } from "../entity/company";
import { AdvertisementRepository } from "../repository/advertisement/advertisement";
import { CompanyRepository } from "../repository/company/company";
import { testAppDataSource, testRedisClient } from "../test-config/test-db";
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

  await testRedisClient.connect();

  companyRepo = new CompanyRepository(testAppDataSource);
  advertisementRepo = new AdvertisementRepository(testAppDataSource);
  advertisementService = new AdvertisementService(
    testRedisClient,
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

    await advertisementService.save(
      company.name,
      AdvertisementGrade.GOLD,
      new Date()
    );
    await advertisementService.save(
      company2.name,
      AdvertisementGrade.SILVER,
      new Date()
    );

    const companyList = await advertisementService.getAllAdvertisingCompany();

    expect(companyList[0].companyName).toBe("JM-Stream");
    expect(companyList[1].companyName).toBe("HO-Stream");
  });
});
