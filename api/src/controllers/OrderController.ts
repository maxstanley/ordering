import { Request, Response, Router } from "express";
import * as HTTPStatus from "http-status-codes";

import IController from "../interfaces/IController";
import { createOrder, getAllOrders, getOrderByUser } from "../services/order";

class OrderController implements IController {
  public path: string;

  public router: Router;

  constructor() {
    this.path = "/v1";
    this.router = Router();
    this.initRoutes();
  }

  public initRoutes() {
    // Get Order
    this.router.get("/order", this.getOrders);
    // Create an order
    this.router.post("/order", this.createOrder);
  }

  getOrders = async (request: Request, response: Response) => {
    let orders;
    console.log(request.url, request.query)

    if (request.query.UserID) {
      const { UserID } = request.query;
      let userID = UserID as string;
      orders = await getOrderByUser(userID);
    } else {
      orders = await getAllOrders();
    }
    
    return response.status(200).json(orders);
  };

  createOrder = async (request: Request, response: Response) => {
    await createOrder(request.body);
    return response.status(HTTPStatus.CREATED).send();
  };
}

export default OrderController;
