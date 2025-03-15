import express from "express";
import sequelize from "./db.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const routesPath = path.resolve(process.cwd(), "src/routes");

const loadRoutes = async () => {
  const files = fs.readdirSync(routesPath).filter((file) => file.endsWith(".js"));
  for (const file of files) {
    const route = await import(`file://${path.join(routesPath, file)}`);
    app.use("/api", route.default);
  }
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await loadRoutes(); 
    await sequelize.sync(); 

    if (process.env.NODE_ENV !== "test") {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

await loadRoutes(); 
export default app;

if (process.env.NODE_ENV !== "test") {
  startServer();
}
