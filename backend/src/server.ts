import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./routes/auth.routes";
import { requestLogger } from "./middleware/requestLogger";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(requestLogger); 

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount Authentication Routes
app.use("/auth", authRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
  });
};

startServer();