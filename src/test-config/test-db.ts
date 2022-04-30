import path from "path";
import { DataSource } from "typeorm";
import { createClient } from "redis";

export const testAppDataSource = new DataSource({
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

export const testRedisClient = createClient({
  url: "redis://default:mypassword@localhost:6381",
});
