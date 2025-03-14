import express from "express";
import sequelize from "./db.js";
import fs from "fs";
import path from "path";
// import registerRoutes from "./routes/register.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const routesPath = path.resolve(process.cwd(), "src/routes"); 

fs.readdirSync(routesPath)
  .filter((file) => file.endsWith(".js"))
  .forEach(async (file) => {
    const route = await import(`file://${routesPath}/${file}`);
    app.use("/api", route.default);
  });

// // Routes
// app.get("/", (req, res) => res.send("API is running 🚀"));
// app.use("/api", registerRoutes);

// Sync Database
sequelize.sync({ alter: true }).then(() => console.log("✅ Database synced"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
