import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from './Components/NavBar/NavBar';
import Home from "./pages/Home/Home";
import Basket, { BasketItem } from './types/Basket';

import './App.css';

function App() {
  const [ basket, setBasket ] = useState<Basket>({});
  const [ basketQuantity, setBasketQuantity ] = useState<number>(0);

  const updateBasketItem = (basketItem: BasketItem) => {
    let newBasket = Object.assign({}, basket);
    newBasket[basketItem.ProductID] = basketItem;
    setBasket(newBasket);
  };

  useEffect(() => {
    let total = 0;
    Object.keys(basket).forEach((productID: string) => {
      total += basket[productID].Quantity;
    });
    setBasketQuantity(total);
  }, [basket]);
  
  return (
    <div className="App">
      <Router>
        <NavBar basketQuantity={basketQuantity} />
        <Switch>
          <Route exact path="/">
            <Home basket={basket} updateBasketItem={updateBasketItem} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
