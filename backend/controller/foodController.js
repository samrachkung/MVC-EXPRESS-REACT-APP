import foodModel from "../models/foodModels.js";
import fs from 'fs';
import path from 'path';

// Add food
const addFood = async (req, res) => {
    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description, 
        price: req.body.price,
        image: image_filename,
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
                if (err) {
                    console.error(`Error deleting file: ${filePath}`, err);
                } else {
                    console.log(`File deleted: ${filePath}`);
                }
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

export { addFood, listFood, removeFood };
