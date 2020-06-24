import { Schema, model } from "mongoose";

import TProduct from "../types/Product";

const productSchema = new Schema({
  ID: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Category: {
    type: String,
    required: true,
    trim: true,
  },
  Measures: {
    type: Map,
    of: String
  }
});

const Product = model<TProduct>("Product", productSchema, "Product");

export default Product;