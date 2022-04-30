"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRedisClient = exports.testAppDataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const redis_1 = require("redis");
exports.testAppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5151,
    username: "root",
    password: "mypassword",
    database: "developer_recruitment",
    synchronize: true,
    logging: true,
    dropSchema: true,
    entities: [path_1.default.join(__dirname, "..", "entity", "*.{js,ts}")],
});
exports.testRedisClient = redis_1.createClient({
    url: "redis://default:mypassword@localhost:6381",
});
