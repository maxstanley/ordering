import React from "react";

import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Product from "../../types/Product";
import Basket, { BasketItem } from "../../types/Basket";

interface Props {
  basket: Basket;
  updateBasketItem: (basketItem: BasketItem) => void;
}

function Home(props: Props) {
  const { basket, updateBasketItem } = props;
  return (
    <div>
      {Object.keys(products).map((category, i) => {
        return (
          <div key={i}>
            <p>{category}</p>
            {products[category].map((product: Product) => {
              return (
                <ProductDetails key={product.ID} product={product} basket={basket} updateBasketItem={updateBasketItem} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const products: any = {
  Wine: [
    {
      ID: "1",
      name: "Wine 1",
      measures: {
        "125ml": "3.50",
        "250ml": "5.00"
      }
    },
    {
      ID: "2",
      name: "Wine 2",
      measures: {
        "125ml": "3.60",
        "250ml": "5.10"
      }
    },
    {
      ID: "3",
      name: "Prosesseco",
      measures: {
        "125ml": "1.60",
        "250ml": "2.10"
      }
    }
  ],
  Beer: [
    {
      ID: "10",
      name: "Beer 1",
      measures: {
        "pint": "4.25",
        "half": "2.50"
      }
    },
    {
      ID: "11",
      name: "Beer 2",
      measures: {
        "pint": "4.50",
        "half": "2.75"
      }
    }
  ]
}

export default Home;