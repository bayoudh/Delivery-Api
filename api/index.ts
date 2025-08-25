// Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "../src/config/db.js";
import authRoutes from "../src/routes/auth.routes.js";
import userRoutes from "../src/routes/user.routes.js";
import restaurantRoutes from "../src/routes/restaurant.routes.js";
import productRoutes from "../src/routes/product.routes.js";
import orderRoutes from "../src/routes/order.routes.js";
import reviewRoutes from "../src/routes/review.routes.js";
import { notFound, errorHandler } from "../src/middlewares/error.js";

async function start() {
  // Connect to database
  await connectDB();

  // Create Express app
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/restaurants", restaurantRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/reviews", reviewRoutes);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
}

start();
