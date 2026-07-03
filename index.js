import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routers/productRouter.js";



dotenv.config();

const app = express(); // Initialize Express app

connectDB(); // Connect to MongoDB

app.use(express.json());  // Middleware to parse JSON request bodies

app.get("/", (req, res) => {  // Root route to check if the backend is running
    res.send("Backend Running");
});

app.use("/api", productRoutes); // Use product routes for any requests starting with /api

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}✅`);
});