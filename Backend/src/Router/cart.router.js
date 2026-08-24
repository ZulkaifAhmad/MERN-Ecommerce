import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../Controller/cart.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/update", authMiddleware, updateCart);
cartRouter.post("/get", authMiddleware, getUserCart);

export default cartRouter;
