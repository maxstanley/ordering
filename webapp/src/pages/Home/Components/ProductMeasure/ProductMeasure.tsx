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

import Basket, { BasketItem } from "../../../../types/Basket";
import Product from "../../../../types/Product";

interface Props {
  product: Product;
  measure: string;
  price: string;
  basket: Basket;
  updateBasketItem: (basketItem: BasketItem) => void;
}

function ProductDetails(props: Props) {
  const { product, measure, price, basket, updateBasketItem } = props;

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
        ProductID: product.ID + measure,
        Name: product.name,
        Quantity: quantity,
        Measure: measure
      };
  
      updateBasketItem(basketItem);
    };

    updateItem();
  }, [quantity]);

  useEffect(() => {
    if (basket[product.ID + measure]) {
      setQuantity(basket[product.ID + measure].Quantity);
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

export default ProductDetails;