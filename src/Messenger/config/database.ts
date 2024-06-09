import { Dialect, Options } from "sequelize";

const config: Options = {
  host: process.env.MESSENGER_DB_HOST,
  database: process.env.MESSENGER_DB_NAME,
  username: process.env.MESSENGER_DB_USER,
  password: process.env.MESSENGER_DB_PASSWORD,
  port: process.env.MESSENGER_DB_PORT ? Number(process.env.DB_PORT) : undefined,
  dialect: (process.env.MESSENGER_DB_DIALECT as Dialect) || "mysql",
  sync: {
    alter: true
  },
  logging: false
};

export default config;

