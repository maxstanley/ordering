import React, { ChangeEvent, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography
} from "@material-ui/core";
import { loginRequest, registerRequest } from "../../../services/account";

interface Props {
  handleAccountCookies(): void;
};

export default function SignUp(props: Props) {
  const { handleAccountCookies } = props;

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const [ displayName, setDisplayName ] = useState<string>();
  const [ email, setEmail ] = useState<string>();
  const [ password, setPassword ] = useState<string>();
  const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>();
  const [ passwordsMatch, setPasswordsMatch ] = useState<boolean>(true);

  const handleDisplayName = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value)
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  const handlePasswordConfirmationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(event.target.value)
  };


  const register = async () => {
    setPasswordsMatch(true);
    if (!displayName || !email || !password || !passwordConfirmation) {
      return;
    }

    if (password !== passwordConfirmation) {
      setPasswordsMatch(false);
      return;
    }

    await registerRequest(displayName, email, password);
    const authenticated = await loginRequest(email, password);

    if (authenticated) {
      handleAccountCookies();
      if (query.get("redirect")) {
        history.push(`/${query.get("redirect")}`);
        return;
      }
      
      history.push('/');
    }
  };


  return (
    <Container>
      <br />
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        tabIndex={1}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="displayName"
        name="displayName"
        label="Display Name"
        autoFocus
        className="textField"
        value={displayName}
        onChange={handleDisplayName}
      />
      <TextField
        tabIndex={2}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        className="textField"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        tabIndex={3}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        // autoFocus
        className="textField"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        tabIndex={4}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="passwordConfirmation"
        name="passwordConfirmation"
        label="Password Confirmation"
        type="password"
        className="textField"
        value={passwordConfirmation}
        onChange={handlePasswordConfirmationChange}
      />
      <Typography hidden={passwordsMatch} color="secondary">Passwords do not match.</Typography>
      <Button
        tabIndex={3}
        fullWidth
        variant="contained"
        color="primary"
        onClick={register}
        className="signInButton"
      >
        Sign Up
      </Button>
    </Container>
  )
}