import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create token function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        // Create token
        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// User register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // Validate name
        if (name.length < 3) {
            return res.status(400).json({ success: false, message: "Name must be at least 3 characters long" });
        }
        // Check if email already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        // Validate password strength
        const isStrong = validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        });
        if (!isStrong) {
            return res.status(400).json({ success: false, message: "Please enter a stronger password" });
        }
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        });
        const user = await newUser.save();
        const token = createToken(user.id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export { loginUser, registerUser };
