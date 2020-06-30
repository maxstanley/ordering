import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { verify } from "jsonwebtoken";
// import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

import NavBar from './Components/NavBar/NavBar';
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
import Basket from "./pages/Basket/Basket";
import Orders from "./pages/Orders/Orders";
import TAccount from "./types/Account";
import TBasket, { BasketItem } from './types/Basket';

import './App.css';
import CustomerOrders from './pages/CustomerOrders/CustomerOrders';

const publicKey: string = process.env.REACT_APP_PUBLIC_KEY!;

function App() {
  // const [ cookies ] = useCookies(["token"]);
  const [ basket, setBasket ] = useState<TBasket>({});
  const [ basketQuantity, setBasketQuantity ] = useState<number>(0);
  const [ basketTotal, setBasketTotal ] = useState<number>(0);
  const [ account, setAccount ] = useState<TAccount | undefined>(undefined);

  const updateBasketItem = (basketItem?: BasketItem) => {
    if (!basketItem) {
      setBasket({});
      return;
    }
    let newBasket = Object.assign({}, basket);
    newBasket[basketItem.ProductID] = basketItem;
    setBasket(newBasket);
  };

  const handleAccountCookies = () => {
    const tokenCookie = Cookies.get("token");

    if (!tokenCookie) {
      setAccount(undefined);
      return;
    }

    if (account) {
      return;
    }

    const token: TAccount = verify(tokenCookie, publicKey) as TAccount;
    setAccount(token);
  }

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    Object.keys(basket).forEach((productID: string) => {
      const productQuantity = basket[productID].Quantity
      totalQuantity += productQuantity;
      totalPrice += +basket[productID].Price * productQuantity;
    });
    setBasketQuantity(totalQuantity);
    setBasketTotal(totalPrice);
  }, [basket]);
  
  return (
    <div className="App">
      <Router>
        <NavBar account={account} basketQuantity={basketQuantity} />
        <Switch>
          <Route exact path="/">
            <Home basket={basket} updateBasketItem={updateBasketItem} />
          </Route>
          <Route exact path="/account">
            <Account account={account} handleAccountCookies={handleAccountCookies} />
          </Route>
          <Route exact path="/basket">
            <Basket account={account} basket={basket} updateBasketItem={updateBasketItem} basketTotal={basketTotal} />
          </Route>
          <Route exact path="/customerorders">
            <CustomerOrders account={account} />
          </Route>
          <Route exact path="/order">
            <Orders account={account} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
