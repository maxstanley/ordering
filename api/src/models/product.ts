import { Schema, model } from "mongoose";

const productSchema = new Schema({
  ID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Product = model("Product", productSchema, "Product");

export default Product;