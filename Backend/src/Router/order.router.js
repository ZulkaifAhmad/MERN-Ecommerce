import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
} from "../Controller/order.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";
import adminMiddleware from "../Middleware/admin.middleware.js";

const orderRouter = express.Router();

// User Order Routes
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/stripe", authMiddleware, placeOrderStripe);
orderRouter.post("/razorpay", authMiddleware, placeOrderRazorpay);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin Order Routes
orderRouter.post("/list", adminMiddleware, allOrders);
orderRouter.get("/list", adminMiddleware, allOrders);
orderRouter.post("/status", adminMiddleware, updateStatus);

export default orderRouter;
