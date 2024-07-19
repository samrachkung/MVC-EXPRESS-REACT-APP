import express from "express";
import cors from "cors";
import { connextDB } from "./config/db.js"; // Corrected to connectDB
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";

import 'dotenv/config';

// app config
const app = express();
const port = process.env.PORT || 4000;  // Using environment variable for port

// middleware
app.use(express.json());
app.use(cors());

// connect DB
connextDB();  // Corrected function name

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("upload"));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
