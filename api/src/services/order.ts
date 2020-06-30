import Order from "../models/order";
import TOrder from "../types/Order";

export const getAllOrders = async () => {
  return await Order.find({}).sort({ Date: -1 });
}

export const getOrderByUser = async (UserID: string) => {
  return await Order.aggregate([
    {
      $match: {
        UserID,
      }
    },
    {
      $sort: {
        Date: -1
      }
    }
  ]);
}

export const createOrder = async (order: TOrder) => {
  return await Order.create(order);
}

export const updateOrder = async (order: TOrder) => {
  return await Order.findOneAndUpdate({ _id: order._id }, order);
}