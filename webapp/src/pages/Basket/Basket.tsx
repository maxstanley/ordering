import React, { useState, ChangeEvent } from "react";
import { Button, TextareaAutosize } from '@material-ui/core';
import { ShoppingCart as ShoppingCartIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import ProductMeasure from "../../Components/ProductMeasure/ProductMeasure";
import TBasket, { BasketItem } from "../../types/Basket";
import Account from "../../types/Account";
import { checkoutBasket } from "../../services/basket";

import "./Basket.css";

interface Props {
  account: Account | undefined;
  basket: TBasket;
  basketTotal: number;
  updateBasketItem: (basketItem?: BasketItem) => void;
}

function Basket(props: Props) {
  const { account, basket, updateBasketItem, basketTotal } = props;
  const history = useHistory();

  const [ message, setMessage ] = useState<string>();

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  };

  const handleCheckout = async () => {
    if (Object.keys(basket).length === 0) { 
      history.push('/');
      return;
    }

    if (!account) {
      history.push("/login?redirect=basket");
      return;
    }
    
    const checkedOut = await checkoutBasket(account, basket, message);

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
      <TextareaAutosize
        // variant="outlined"
        // margin="normal"
        required
        // fullWidth
        id="message"
        name="message"
        placeholder="Message: Optional"
        autoFocus
        className="messageField"
        value={message}
        onChange={handleMessageChange}
      />
      <br />
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