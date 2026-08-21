import express from "express";
import router from "./Router/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinaryConfig from './Config/Cloudinary.js'
import productRouter from "./Router/product.router.js";
import authRouter from "./Router/auth.router.js";

let app = express();
cloudinaryConfig()
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Successfully created firt api in rest api",
  });
});

export default app;
