import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order from frontend
const placeOrder = async (req, res) => {
    try {
        const { userId, item, amount, address, token } = req.body;

        // Process payment with Stripe
        const payment = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects amount in cents
            currency: 'usd',
            payment_method: token,
            confirm: true
        });

        if (payment.status === 'succeeded') {
            const newOrder = new orderModel({
                userId,
                item,
                amount,
                address
            }); 

            await newOrder.save();
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            res.status(201).json({ message: "Order placed successfully" });
        } else {
            res.status(400).json({ message: "Payment failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

export { placeOrder };
