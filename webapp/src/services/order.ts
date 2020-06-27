const URL = process.env.REACT_APP_API_URL;

export async function getUserOrders(userID: string) {
  let response;

  try {
    response = await fetch(`${URL}/v1/order?UserID=${userID}`);
  } catch (error) {
    console.log(error);
    return undefined;
  }

  return await response?.json();
}

export async function getAllOrders() {
  let response;

  try {
    response = await fetch(`${URL}/v1/order`);
  } catch (error) {
    console.log(error);
    return undefined;
  }

  return await response?.json();
}