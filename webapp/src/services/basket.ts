import Basket from "../types/Basket";

const URL = process.env.REACT_APP_API_URL;

export async function checkoutBasket(UserID: string, Basket: Basket) {
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
      UserID,
      Date: new Date(),
      Basket: basketArray
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