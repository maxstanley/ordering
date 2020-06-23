import React from "react";

import ProductMeasure from "../../Components/ProductMeasure/ProductMeasure";
import TBasket, { BasketItem } from "../../types/Basket";

interface Props {
  basket: TBasket;
  basketTotal: number;
  updateBasketItem: (basketItem: BasketItem) => void;
}

function Basket(props: Props) {
  const { basket, updateBasketItem, basketTotal } = props;
  return (
    <div>
      <h3>Basket</h3>
      {Object.keys(basket).map((key) => {
        const item = basket[key];
        return (
          <ProductMeasure
            basket={basket}
            measure={item.Measure}
            price={item.Price}
            updateBasketItem={updateBasketItem}
            productName={item.Name}
            productID={item.ProductID}
          />
        )
      })}
      <p>£{basketTotal.toFixed(2)}</p>
    </div>
  )
}

export default Basket;