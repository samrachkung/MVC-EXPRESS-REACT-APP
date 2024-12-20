import express from 'express';
import { loginUser, registerUser } from '../controller/userController.js';

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", registerUser);

// Login a user
userRouter.post("/login", loginUser);

export default userRouter;
