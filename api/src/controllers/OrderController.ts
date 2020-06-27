import { Request, Response, Router } from "express";
import * as HTTPStatus from "http-status-codes";
import { v4 as uuid } from "uuid";

import IController from "../interfaces/IController";
import { createOrder, getAllOrders, getOrderByUser } from "../services/order";
import Order from "../models/order";
import TOrder from "../types/Order";

class OrderController implements IController {
  public path: string;

  public router: Router;

  private clients: { id: string, response: Response }[] = [];

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

    this.router.get("/order/stream", this.orderStream);
  }

  getOrders = async (request: Request, response: Response) => {
    let orders;

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
    const order = new Order(request.body);
    createOrder(request.body);
    
    response.status(HTTPStatus.CREATED).send();
    return this.sendEventToAll(order);
  };

  // https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app
  orderStream = async (request: Request, response: Response) => {
    const headers = {
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache"
    };

    response.status(HTTPStatus.OK).set(headers);
    response.write(`data: "Connection Created"\n\n`);

    const client = {
      id: uuid(),
      response,
    };
    this.clients.push(client);

    request.on("close", () => {
      this.clients = this.clients.filter(c => c.id !== client.id);
    });
  };

  sendEventToAll = async (order: TOrder) => {
    this.clients.forEach(c => {
      c.response.write(`data: ${JSON.stringify(order)}\n\n`);
    });
  };
}

export default OrderController;
