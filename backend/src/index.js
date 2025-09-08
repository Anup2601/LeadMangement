import express from 'express';
import UserRouter from "./routes/user.routes.js"
import LeadRouter from './routes/lead.routes.js';
import { connectDB } from './lib/db.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT ;
const NODE_ENV = process.env.NODE_ENV || "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173"], // later add your deployed frontend url
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send(`Jai shree Ram, running on port ${PORT}`);
});

app.use("/api/auth",UserRouter);
app.use("/leads", LeadRouter);

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Match all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  connectDB();
});
