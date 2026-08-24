import jwt from "jsonwebtoken";
import Blocklist from "../Schema/blocklist.schema.js";

async function adminMiddleware(req, res, next) {
  try {
    let token =
      req.headers.token ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.cookies?.token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required. Please login as admin.",
      });
    }

    const isBlocked = await Blocklist.findOne({ token });
    if (isBlocked) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked, please login again",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification error:", err);
        return res.status(401).json({
          success: false,
          message: "Invalid or expired admin token",
        });
      }

      if (
        decoded.email !== process.env.ADMIN_EMAIL ||
        decoded.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: Admin access required",
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in admin authentication",
      error: error.message,
    });
  }
}

export default adminMiddleware;
