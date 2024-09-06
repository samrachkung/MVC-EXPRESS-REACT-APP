import express from 'express';
import { addFood, listFood, removeFood, updateFood } from '../controller/foodController.js';
import multer from 'multer';
import fs from 'fs';


const foodRouter = express.Router();



// Image storage engine
const storage = multer.diskStorage({
    destination:"upload",
    filename:(req,file,callback)=>{
        return callback(null,`${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.put("/update/:id", upload.single("image"), updateFood);


export default foodRouter;
