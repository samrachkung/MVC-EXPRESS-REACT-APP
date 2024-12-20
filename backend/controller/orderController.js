import OrderModel from "../models/orderModels.js";
import UserModel from "../models/userModels.js";
import Stripe from "stripe";
import orderModels from "../models/orderModels.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontendUrl = "http://localhost:5173";
    try {
        const { userId, items, amount, address } = req.body;
        //check requird fields 
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields (userId, items, amount, address) are required.",
            });
        }

        // Save order to database
        const newOrder = new OrderModel({
            userId,
            items,
            amount,
            address,
            payment: false, // Initial payment status is false
        });
        //save new order to database 
        await newOrder.save();
        // Clear user's cart
        await UserModel.findByIdAndUpdate(userId, { cartData: {} });
        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100),//price in cent 
            },
            quantity: item.quantity,
        }));
        // Add delivery fee
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery Charges" },
                unit_amount: 200, // $2 delivery fee
            },
            quantity: 1,
        });
        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&order_id=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&order_id=${newOrder._id}`,
        });

        return res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
// verify user payment 
const verifyOrder = async (req, res) => {
    const { order_id, success } = req.body;
    try {
        if (success === "true") { // Ensure success is a string
            await OrderModel.findByIdAndUpdate(order_id, { payment: true });
            return res.status(200).json({ success: true, message: "Order verified successfully." });
        } else {
            await OrderModel.findByIdAndDelete(order_id); // Remove unverified orders
            return res.status(400).json({ success: false, message: "Payment verification failed." });
        }
    } catch (error) {
        console.error("Order verification error:", error.message);
        return res.status(500).json({ success: false, message: "Server error occurred during verification." });
    }
};
// list user order on frontend 
const userOrders = async (req, res) => {

    try {
        const orders = await OrderModel.find({ userId: req.body.userId });
        return res.status(200).json({ success: true, data: orders });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Order user not found in list" });
    }

};
//listing orders for admin panel
const listOrder = async (req, res) => {

    try {
        const orders = await OrderModel.find({});
        res.json({ success: true, data: orders });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Order user not found in list" });
    }

};

// api for update user orders status
const updateOrderStatus = async (req, res) => {
    try {
        await orderModels.findByIdAndUpdate(req.body.order_id, { status: req.body.status });
        res.json({ success: true, message: "Order status update successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error update order status " });
    }

};

export { placeOrder, verifyOrder, userOrders, listOrder, updateOrderStatus };