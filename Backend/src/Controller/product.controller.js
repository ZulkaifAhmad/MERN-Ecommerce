import Product from "../Schema/product.schema.js";
import { v2 as cloudinary } from "cloudinary";

async function AddProduct(req, res) {
  try {
    const { name, sizes, price, description, category, subCategory, bestseller } =
      req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (image) => {
          let result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
            folder: "E-commerce-MERN-Stack-Project",
          });
          return result.secure_url;
        })
      );
    }

    let parsedSizes = [];
    if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = sizes.split(",").map((s) => s.trim());
      }
    } else if (Array.isArray(sizes)) {
      parsedSizes = sizes;
    }

    const product = new Product({
      name,
      sizes: parsedSizes,
      price: Number(price),
      description,
      category,
      subCategory,
      image: imagesUrl.length > 0 ? imagesUrl : (req.body.image ? (Array.isArray(req.body.image) ? req.body.image : [req.body.image]) : []),
      bestseller: bestseller === "true" || bestseller === true,
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error adding product",
    });
  }
}

async function GetAllProducts(req, res) {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error retrieving products",
    });
  }
}

async function GetSingleProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error retrieving product",
    });
  }
}

async function removeProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error removing product",
    });
  }
}

export { AddProduct, GetAllProducts, GetSingleProduct, removeProduct };
