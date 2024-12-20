import express from "express";
import authMiddleware from "../middleware/auth.js"; // Middleware for user authentication
import {placeOrder, verifyOrder, userOrders, listOrder, updateOrderStatus} from "../controller/orderController.js";

const orderRouter = express.Router();

// POST /api/order/place - Place an order (protected route)
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware , verifyOrder );
orderRouter.post("/userorders", authMiddleware , userOrders );
orderRouter.get('/list',listOrder);
orderRouter.post('/status',updateOrderStatus);


export default orderRouter;
