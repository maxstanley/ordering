interface Basket {
  [ProductID: string]: BasketItem;
};

export interface BasketItem {
  ProductID: string;
  Name: string;
  Quantity: number;
  Measure: string;
}

export default Basket;