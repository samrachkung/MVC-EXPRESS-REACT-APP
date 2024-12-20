import foodModel from "../models/foodModels.js";
import fs from 'fs';
import path from 'path';

// Add food
const addFood = async (req, res) => {
    console.log("Request Body: ", req.body); // Debugging log
    console.log("Request File: ", req.file); // Debugging log for uploaded file

    if (!req.body.name || !req.body.category || !req.file) {
        return res.json({ success: false, message: "All fields are required!" });
    }

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename,
        category: req.body.category
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food!" });
    }
};

// Update food
const updateFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            if (req.file && req.file.filename) {
                const oldFilePath = path.join('upload', food.image);
                fs.unlink(oldFilePath, (err) => {
                    if (err) console.error(`Error deleting file: ${oldFilePath}`, err);
                });
                food.image = req.file.filename;
            }

            food.name = req.body.name || food.name;
            food.description = req.body.description || food.description;
            food.price = req.body.price || food.price;
            food.category = req.body.category || food.category;

            await food.save();
            res.json({ success: true, message: "Food updated!" });
        } else {
            res.json({ success: false, message: "Food item not found!" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food!" });
    }
};

// List all foods
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food list!" });
    }
};

// Remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            const filePath = path.join('upload', food.image);
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Error deleting file: ${filePath}`, err);
            });
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Food removed!" });
        } else {
            res.json({ success: false, message: "Food item not found!" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food!" });
    }
};

export { addFood, updateFood, listFood, removeFood };
