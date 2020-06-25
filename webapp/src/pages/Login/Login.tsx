import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography
} from "@material-ui/core";

import { loginRequest } from "../../services/account";

import Account from "../../types/Account";

interface Props  {
  handleAccountCookies(): void;
  account: Account | undefined;
}

// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
export function Login(props: Props) {
  const { account, handleAccountCookies } = props;
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const [ email, setEmail ] = useState<string>();
  const [ password, setPassword ] = useState<string>();
  const [ badAuth, setBadAuth ] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  const login = async () => {
    if (!email || !password) {
      return;
    }

    const authenticated = await loginRequest(email, password);

    setBadAuth(!authenticated);

    if (authenticated) {
      handleAccountCookies();
      if (query.get("redirect")) {
        history.push(`/${query.get("redirect")}`);
        return;
      }
      
      history.push('/');
    }
  };

  useEffect(() => {
    if (account) {
      if (query.get("redirect")) {
        history.push(`/${query.get("redirect")}`);
        return;
      }

      history.push("/");
      return;
    }
    
    handleAccountCookies();
  }, [account]);

  return (
    <Container>
      <br />
      <Typography variant="h5">Sign In</Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        autoFocus
        className="textField"
        value={email}
        error={badAuth}
        onChange={handleEmailChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        autoFocus
        className="textField"
        value={password}
        error={badAuth}
        onChange={handlePasswordChange}
      />
      <Typography hidden={!badAuth} color="secondary">Username and/or password incorrect</Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={login}
        className="signInButton"
      >
        Sign In
      </Button>
    </Container>
  )
}