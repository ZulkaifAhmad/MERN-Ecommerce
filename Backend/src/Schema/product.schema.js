import mongoose from "mongoose";

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    bestseller: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

let Product = mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
