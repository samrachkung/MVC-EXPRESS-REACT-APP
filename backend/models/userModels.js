import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartData: {
            type: Object,
            default: {}
        }, // Storing cart as a flexible object
    },
    { minimize: false } // Ensures empty objects are stored as-is in MongoDB
);

// Prevent model re-compilation error during hot-reloading in development
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
