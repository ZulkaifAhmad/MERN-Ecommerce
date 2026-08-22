import Product from "../Schema/product.schema.js";
import { v2 as cloudinary } from "cloudinary";

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

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
          folder: "E-commerce-MERN-Stack-Project"
        });
        return result.secure_url;
      }),
    );

    let product = new Product({
      name,
      sizes: JSON.parse(sizes),
      price : Number(price),
      description,
      category,
      subCategory,
      image: imagesUrl,
      bestseller : bestseller === 'true' ? true : false,
    });

    await product.save();

    res.status(200).json({ message: "Product added successfully" , 'product' : product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function GetAllProducts(req, res) {
  try {
    let products = await Product.find();
    res.status(200).json({ message: "Products retrieved successfully", products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function GetSingleProduct(req, res) {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product retrieved successfully", product });
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function removeProduct(req, res) {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { AddProduct, GetAllProducts, GetSingleProduct, removeProduct };
