import React from "react";
import { Button } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import ProductMeasure from "../../Components/ProductMeasure/ProductMeasure";
import TBasket, { BasketItem } from "../../types/Basket";
import { checkoutBasket } from "../../services/basket";

interface Props {
  basket: TBasket;
  basketTotal: number;
  updateBasketItem: (basketItem?: BasketItem) => void;
}

function Basket(props: Props) {
  const { basket, updateBasketItem, basketTotal } = props;
  const history = useHistory();

  const handleCheckout = async () => {
    if (Object.keys(basket).length === 0) { 
      history.push('/');
      return;
    }
    
    const checkedOut = await checkoutBasket("543", basket);

    if (checkedOut) {
      updateBasketItem(undefined);
      history.push("/order");
    }
  };

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
      <Button
        variant="contained"
        color="default"
        startIcon={<ShoppingCartIcon />}
        onClick={handleCheckout}
      >Checkout</Button>
    </div>
  )
}

export default Basket;