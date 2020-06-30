import React from "react";
import {
  Button,
  Container
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
// import { useCookies } from "react-cookie";

import { logoutRequest } from "../../services/account";
import TAccount from "../../types/Account";

interface Props {
  handleAccountCookies(): void;
  account: TAccount | undefined;
}

function Account(props: Props) {
  const { account, handleAccountCookies } = props;
  const history = useHistory();

  const logout = async () => {
    Cookies.remove("token");
    await logoutRequest();
    Cookies.remove("token");
    handleAccountCookies()
    history.push("/");
  };

  if (!account) {
    history.push("/login?redirect=account");
  }

  return (
    <Container>
      <h3>Account</h3>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={logout}
      >
        Logout
      </Button>
    </Container>
  )
}

export default Account;