import { Sequelize } from "sequelize";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Import JSON config using require()
const config = require("../config/config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    ...dbConfig,
    logging: false,
  }
);

export default sequelize;
