import Order from "../models/order";

const getAllOrders = async () => {
  return await Order.find({}).sort({ Date: -1 });
}

const getOrderByUser = async (UserID: string) => {
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

const createOrder = async (order: any) => {
  await Order.create(order);
}

export {
  getAllOrders,
  getOrderByUser,
  createOrder
}