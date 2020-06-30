import Basket from "../types/Basket";

import TAccount from "../types/Account";

const URL = process.env.REACT_APP_API_URL;

export async function checkoutBasket(account: TAccount, Basket: Basket, Message: String | undefined) {
  let basketArray: any[] = [];
  
  Object.keys(Basket).forEach((id: string) => {
    basketArray.push(Basket[id]);
  });

  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserID: account.AccountID,
      DisplayName: account.DisplayName,
      Date: new Date(),
      Basket: basketArray,
      Message,
    })
  };

  let response;

  try {
    response = await fetch(`${URL}/v1/order`, fetchOptions);
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}