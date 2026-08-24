import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinaryConfig from "./Config/Cloudinary.js";
import authRouter from "./Router/auth.router.js";
import productRouter from "./Router/product.router.js";
import cartRouter from "./Router/cart.router.js";
import orderRouter from "./Router/order.router.js";

const app = express();

// Initialize Cloudinary
cloudinaryConfig();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for frontend and admin (all development ports)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.startsWith("http://localhost:")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// Mount API Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Health check endpoint
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Ecommerce MERN Backend API is running smoothly",
  });
});

export default app;
