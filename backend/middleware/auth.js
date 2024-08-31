import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const {token}= req.headers; // Expecting 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Token verification failed" });
    }
};

export default authMiddleware;
