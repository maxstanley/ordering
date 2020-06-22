import { Request, Response, Router } from "express";
import * as HTTPStatus from "http-status-codes";

import IController from "../interfaces/IController";
import { getAllProducts } from "../services/product";

class ProductController implements IController {
  public path: string;

  public router: Router;

  constructor() {
    this.path = "/v1";
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes() {
    // Get all available products
    this.router.get("/product", this.getAllProducts);

    // Create a Product
    this.router.post("/product");

    // Get product by ID
    this.router.get("/product/:ProductID");
  }

  getAllProducts = async (request: Request, response: Response) => {
    const products = await getAllProducts();
    return response.json(products).status(HTTPStatus.OK).send();
  }
}

export default ProductController;
