const URL = process.env.REACT_APP_API_URL;

export async function loginRequest(Email: string, Password: string) {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email,
      Password
    })
  };

  const response = await fetch(`${URL}/v1/login`, fetchOptions);

  if (response.status === 200) {
    return true;
  }

  return false;
};

export async function logoutRequest() {
  await fetch(`${URL}/v1/logout`);
}

export async function registerRequest(DisplayName: string, Email: string, Password: string) {
  const fetchOptions: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      DisplayName,
      Email,
      Password
    })
  };

  const response = await fetch(`${URL}/v1/account`, fetchOptions);

  if (response.status === 200) {
    return true;
  }

  return false;
};