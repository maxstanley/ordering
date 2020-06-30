import { Schema, model } from "mongoose";

import TOrder from "../types/Order";

const orderSchema = new Schema({
  UserID: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    enum: [ "PENDING", "PREPARING", "READY", "COLLECTED", "CANCELLED" ],
    default: "PENDING"
  },
  Basket: [{
    ProductID: {
      type: String
    },
    Name: {
      type: String
    },
    Quantity: {
      type: Number
    },
    Measure: {
      type: String
    },
    Price: {
      type: Number
    }
  }]
});

const Order = model<TOrder>("Order", orderSchema, "Order");

export default Order;