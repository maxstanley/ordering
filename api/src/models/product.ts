import { Schema, model } from "mongoose";

import TProduct from "../types/Product";

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

const Product = model<TProduct>("Product", productSchema, "Product");

export default Product;