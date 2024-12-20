import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not authorized, please log in." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id; // Attach userId to the request body
        console.log("Authenticated user:", req.body.userId);
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(403).json({ success: false, message: "Token verification failed, login again." });
    }
};

export default authMiddleware;