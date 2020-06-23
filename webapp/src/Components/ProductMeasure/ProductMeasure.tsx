import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Input,
  Typography
} from "@material-ui/core";
import {
  Add as AddIcon,
  Remove as RemoveIcon
} from "@material-ui/icons";

import Basket, { BasketItem } from "../../types/Basket";

interface Props {
  productID: string;
  productName: string;
  measure: string;
  price: number;
  basket: Basket;
  updateBasketItem: (basketItem: BasketItem) => void;
}

function ProductMeasure(props: Props) {
  const { productName, productID, measure, price, basket, updateBasketItem } = props;

  const [ quantity, setQuantity ] = useState<number>(0);

  const changeQuantity = (increment: number) => {
    setQuantity(quantity + increment);
  };

  useEffect(() => {
    if (quantity < 0) {
      setQuantity(0);
    }

    const updateItem = () => {
      if (quantity === 0) { return; }
      const basketItem: BasketItem = {
        ProductID: productID,
        Name: productName,
        Quantity: quantity,
        Measure: measure,
        Price: price
      };

      console.log(basketItem)
  
      updateBasketItem(basketItem);
    };

    updateItem();
  }, [quantity]);

  useEffect(() => {
    console.log(basket, productID)
    if (basket[productID]) {
      console.log(basket[productID].Quantity);
      setQuantity(basket[productID].Quantity);
    }

  }, []);

  return (
    <Grid container spacing={2} className="container" >
      <Grid item xs={5}>
        <Typography className="description">
          {measure} - £{price}
        </Typography>
      </Grid>
      <Grid item container xs={7} wrap="nowrap">
        <Grid item xs>
          <Button
            onClick={() => changeQuantity(-1)}
          >
            <RemoveIcon />
          </Button>
        </Grid>
        <Grid item xs>
          <Input value={quantity} />
        </Grid>
        <Grid item xs>
          <Button
            onClick={() => changeQuantity(1)}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductMeasure;