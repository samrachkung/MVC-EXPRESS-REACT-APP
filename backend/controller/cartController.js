import userModel from "../models/userModels.js";

// Add iteam to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;

        if (!cartData[req.body.iteamId]) {
            cartData[req.body.iteamId] = 1;
        } else {
            cartData[req.body.iteamId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.status(200).json({ success: true, message: "Successfully added to cart" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};

// Remove iteam from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;
        if (cartData[req.body.iteamId] > 0) {
            cartData[req.body.iteamId] -= 1;
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            return res.status(200).json({ success: true, message: "Successfully removed from cart" });
        } else {
            return res.status(404).json({ success: false, message: "iteam not found in cart" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        return res.status(200).json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};

export { addToCart, removeFromCart, getCart };
