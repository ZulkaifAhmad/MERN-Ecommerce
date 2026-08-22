import jwt from "jsonwebtoken";
import Blocklist from "../Schema/blocklist.schema.js";

async function adminMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    const isBlocked = await Blocklist.findOne({ token });
    if (isBlocked) {
      return res.status(401).json({
        message: "Token has been revoked, please login again",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification error:", err);
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      if (
        decoded.email !== process.env.ADMIN_EMAIL ||
        decoded.role !== "admin"
      ) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export default adminMiddleware;
