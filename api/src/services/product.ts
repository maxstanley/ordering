import Product from "../models/product";
import TProduct from "../types/Product";

const getAllProducts = async () => {
  const products = await Product.aggregate([
    {
      $group: {
        _id: "$Category",
        products: {
          $push: "$$ROOT"
        } 
      },
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]);

  let output: any = {};

  products.forEach((category: any) => {
    output[category._id] = [];
    category.products.forEach((product: any) => {
      output[category._id].push(product);
    });
  });
  return output;
}

export {
  getAllProducts
}