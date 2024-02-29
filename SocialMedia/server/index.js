import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import curdRoutes from "./routes/curdRoutes.js";
import errorHandling from "./middleware/errorHandling.js";

const app = express();

dotenv.config(); // Load environment variables

connectDB(); // Connect to the database

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// prefix routes
app.use("/api/auth", authRoutes);
app.use("/api/curd", curdRoutes);

// Handle 404 errors
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
    data: null,
  });
});

// Error handling middleware
app.use(errorHandling);

const port = process.env.PORT || 5050;

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server has been gracefully terminated.");
    process.exit(0);
  });
});
