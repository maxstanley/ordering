const URL = process.env.REACT_APP_API_URL;

export async function getAllProducts() {
  let response;

  try {
    response = await fetch(`${URL}/v1/product`);
  } catch (error) {
    console.log(error);
    return undefined;
  }

  return await response?.json();
}