import { Sequelize } from "sequelize";
import envConfig from "../env";
import { isProductionEnvironment } from "@/features/common/helpers";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: envConfig.get("DB_HOST"),
  port: parseInt(envConfig.get("DB_PORT")!),
  pool: { acquire: 180000, evict: 1000, idle: 1000 },
  ...(isProductionEnvironment() && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
  username: envConfig.get("DB_USER"),
  password: envConfig.get("DB_PASSWORD"),
  database: envConfig.get("DB_NAME"),
  logging: false,
});

const authenticate = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};

const db = {
  authenticate,
  sequelize,
};

export default db;
