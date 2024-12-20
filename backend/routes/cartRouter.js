import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controller/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

// Add an item to the cart
cartRouter.post("/add", authMiddleware, addToCart);

// Remove an item from the cart
cartRouter.post("/remove", authMiddleware, removeFromCart);

// Get the user's cart data
cartRouter.post("/get", authMiddleware, getCart);


export default cartRouter;
