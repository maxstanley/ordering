import { Document } from 'mongoose';

interface Order extends Document {
  ID: string;
  UserID: string;
  Date: Date;
  basket: { [ProductID: string]: ProductOrder };
};

interface ProductOrder {
  ProductID: string;
  Name: string;
  Measure: string;
  Price: number;
  Quantity: number;
};

export default Order;