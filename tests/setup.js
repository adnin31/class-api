import dotenv from "dotenv";

import sequelize from "../src/db.js";
dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true }); // Reset DB for tests
});

afterAll(async () => {
  await sequelize.close();
});

process.env.PORT = process.env.PORT || "3001"; 