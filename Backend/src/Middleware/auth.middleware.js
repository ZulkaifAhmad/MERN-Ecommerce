import jwt from "jsonwebtoken";
import Blocklist from "../Schema/blocklist.schema.js";

async function authMiddleware(req, res, next) {
  try {
    let token =
      req.headers.token ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.cookies?.token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, please login again",
      });
    }

    const isBlocked = await Blocklist.findOne({ token });
    if (isBlocked) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked, please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again",
      });
    }

    if (!req.body) req.body = {};
    req.body.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
}

export default authMiddleware;
