import { Request, Response, Router } from "express";
import * as HTTPStatus from "http-status-codes";
import { v4 as uuid } from "uuid";

import IController from "../interfaces/IController";
import { createOrder, getAllOrders, getOrderByUser, updateOrder } from "../services/order";
import Order from "../models/order";
import TOrder from "../types/Order";

class OrderController implements IController {
  public path: string;

  public router: Router;

  private clients: { id: string, response: Response }[] = [];
  private customers: { id: string, response: Response }[] = [];

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

    // Update an order
    this.router.put("/order", this.updateOrder);

    // Stream of new orders
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
    createOrder(order);
    
    response.status(HTTPStatus.CREATED).send();
    return this.sendEventToAll(order);
  };

  updateOrder = async (request: Request, response: Response) => {
    const newOrder = new Order(request.body);
    updateOrder(request.body);

    response.status(HTTPStatus.NO_CONTENT).send();
    return this.sendEventToClient(newOrder)
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

    let id: string;

    if (request.query.customer) {
      id = request.account!.AccountID
      console.log("Customer Stream: ", id)
      const customer = {
        id,
        response,
      };
      this.customers.push(customer);
    } else if (request.account?.IsAdmin) {
      console.log("Admin Stream")
      id = uuid();
      const client = {
        id,
        response,
      };
      this.clients.push(client);
    } else {
      return response.status(HTTPStatus.BAD_REQUEST).send();
    }

    request.on("close", () => {
      this.clients = this.clients.filter(c => c.id !== id);
      console.log("Connection Closed:", id);
    });
  };

  sendEventToAll = async (order: TOrder) => {
    this.clients.forEach(c => {
      c.response.write(`data: ${JSON.stringify(order)}\n\n`);
    });
  };

  sendEventToClient = async (order: TOrder) => {
    this.customers.forEach((customer) => {
      if (order.UserID !== customer.id) { return; }
      customer.response.write(`data: ${JSON.stringify(order)}\n\n`);
    });
  }
}

export default OrderController;
