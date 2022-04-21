import path from "path";
import { DataSource } from "typeorm";
import { AppUser } from "../entity/app-user";
import { UserRepository } from "../repository/user/user";

let appDataSource: DataSource;

beforeAll(async () => {
  appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5151,
    username: "root",
    password: "mypassword",
    database: "developer_recruitment",
    synchronize: true,
    logging: true,
    dropSchema: true,
    entities: [path.join(__dirname, "..", "entity", "*.{js,ts}")],
  });

  await appDataSource
    .initialize()
    .then(() => {
      console.log("appDataSource test initialized");
    })
    .catch((err) => console.log(err));
});

describe("Save user", () => {
  test("should save user and return saved user", async () => {
    const userRepo = new UserRepository(appDataSource);
    const user = new AppUser();
    user.email = "sarah@gmail.com";
    let savedUser: AppUser = await userRepo.save(user);

    expect(savedUser.email).toBe("sarah@gmail.com");
  });
});
