import express from 'express';
import { addFood, listFood, removeFood, updateFood } from '../controller/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: "upload", // Directory for storing images
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Add a new food item
foodRouter.post("/add", upload.single("image"), addFood);

// List all food items
foodRouter.get("/list", listFood);

// Remove a food item
foodRouter.post("/remove", removeFood);

// Update a food item (with image upload)
foodRouter.put("/update/:id", upload.single("image"), updateFood);

export default foodRouter;
