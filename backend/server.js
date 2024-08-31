import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; 
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js";
import dotenv from 'dotenv';
import orderRouter from "./routes/orderRouter.js";

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;  
// Middleware
app.use(express.json());
app.use(cors());
// Connect DB
connectDB();  
// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("upload"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// Root endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
