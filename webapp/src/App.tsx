import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './Components/NavBar/NavBar';
import Home from "./pages/Home/Home";
import Basket from "./pages/Basket/Basket";
import TBasket, { BasketItem } from './types/Basket';

import './App.css';

function App() {
  const [ basket, setBasket ] = useState<TBasket>({});
  const [ basketQuantity, setBasketQuantity ] = useState<number>(0);
  const [ basketTotal, setBasketTotal ] = useState<number>(0);

  const updateBasketItem = (basketItem: BasketItem) => {
    let newBasket = Object.assign({}, basket);
    newBasket[basketItem.ProductID] = basketItem;
    setBasket(newBasket);
  };

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    Object.keys(basket).forEach((productID: string) => {
      totalQuantity += basket[productID].Quantity;
      totalPrice += +basket[productID].Price;
    });
    setBasketQuantity(totalQuantity);
    setBasketTotal(totalPrice);
    console.log(basket)
  }, [basket]);
  
  return (
    <div className="App">
      <Router>
        <NavBar basketQuantity={basketQuantity} />
        <Switch>
          <Route exact path="/">
            <Home basket={basket} updateBasketItem={updateBasketItem} />
          </Route>
          <Route exact path="/basket">
            <Basket basket={basket} updateBasketItem={updateBasketItem} basketTotal={basketTotal} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
