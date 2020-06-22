import Product from "../models/product";

const getAllProducts = async () => {
  return Product.find({});
}

export {
  getAllProducts
}