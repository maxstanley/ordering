interface Order {
  _id: string;
  ID: string;
  UserID: string;
  Date: Date;
  Status: Status;
  Basket: { [ProductID: string]: ProductOrder };
};

interface ProductOrder {
  ProductID: string;
  Name: string;
  Measure: string;
  Price: number;
  Quantity: number;
};

export enum Status {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  READY = "READY",
  COLLECTED = "COLLECTED",
  CANCELLED = "CANCELLED"
}

export default Order;