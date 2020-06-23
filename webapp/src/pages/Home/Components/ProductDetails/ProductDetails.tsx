import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

import Basket, { BasketItem } from "../../../../types/Basket";
import Product from "../../../../types/Product";

import ProductMeasure from "../ProductMeasure/ProductMeasure";

import "./ProductDetails.css";

interface Props {
  product: Product;
  basket: Basket;
  updateBasketItem: (basketItem: BasketItem) => void;
}

function ProductDetails(props: Props) {
  const { product, basket, updateBasketItem } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        id={product.ID}
      >
        <Typography>{product.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          {Object.keys(product.measures).map((measure) => {
            return (
              <ProductMeasure measure={measure} price={product.measures[measure]} product={product} basket={basket} updateBasketItem={updateBasketItem} />
            )
          })}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default ProductDetails;