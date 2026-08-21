import express from "express";
import {
  AddProduct,
  GetAllProducts,
  GetSingleProduct,
  removeProduct,
} from "../Controller/product.controller.js";
import upload from "../Middleware/multer.middleware.js";

const productRouter = express.Router();

productRouter.post(
  "/create-product",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  AddProduct,
);
productRouter.get("/getAll-products", GetAllProducts);
productRouter.get("/get-product/:id", GetSingleProduct);
productRouter.delete("/delete-product/:id", removeProduct);

export default productRouter;
