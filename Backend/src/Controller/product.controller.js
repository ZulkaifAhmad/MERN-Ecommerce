import Product from "../Schema/product.schema.js";
import { v2 as claudinary } from "cloudinary";
import upload from "../Middleware/multer.middleware.js";

async function AddProduct(req, res) {
  try {
    let { name, sizes, price, description, category, subCategory, bestseller } =
      req.body;

    let image1 = req.files.image1?.[0];
    let image2 = req.files.image2?.[0];
    let image3 = req.files.image3?.[0];
    let image4 = req.files.image4?.[0];

    let images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined,
    );

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function GetAllProducts(req, res) {}

async function GetSingleProduct(req, res) {}

async function removeProduct(req, res) {}

export { AddProduct, GetAllProducts, GetSingleProduct, removeProduct };
