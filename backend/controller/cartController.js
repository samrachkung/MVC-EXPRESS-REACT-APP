import userModel from "../models/userModels.js";
// Add item to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.status(200).json({ success: true, message: "Successfully added to cart" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};
// Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
            return res.status(200).json({ success: true, message: "Successfully removed from cart" });
        } else {
            return res.status(404).json({ success: false, message: "item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userId = req.user.id; // Use the decoded user ID from the token
        console.log("Decoded user ID:", userId); 
        const userData = await userModel.findById(userId);
        if (!userData) {
            console.log(userId);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
};
export { addToCart, removeFromCart, getCart };
