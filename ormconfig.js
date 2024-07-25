"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
exports.dataSourceOptions = {
  type: "mysql",
  host: "142.171.245.164",
  port: "3306",
  username: "user",
  password: "123456",
  database: "xk",
  autoLoadEntities: true,
  maxQueryExecutionTime: 1000,
  cache: true,
  charset: "utf8mb4",
  logging: [
    "error",
    "warn",
    "info"
  ],
  migrations: [
    "dist/migrations/*.js"
  ],
  entities: [
    "dist/**/*.entity.js"
  ],
  cli: {
    migrationsDir: "src/migrations"
  }
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;