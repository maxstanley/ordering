import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Tab,
  Tabs
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import TabPanel from "./TabPanel/TabPanel";

import { logoutRequest } from "../../services/account";
import TAccount from "../../types/Account";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

import "./Account.css";

interface Props {
  handleAccountCookies(): void;
  account: TAccount | undefined;
}

export default function Account(props: Props) {
  const { account, handleAccountCookies } = props;
  const history = useHistory();

  const [ value, setValue ] = useState(0);

  const logout = async () => {
    Cookies.remove("token");
    await logoutRequest();
    Cookies.remove("token");
    handleAccountCookies()
    history.push("/");
  };

  // if (!account) {
  //   history.push("/login?redirect=account");
  // }

  const handleValueChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // https://material-ui.com/components/tabs/#nav-tabs
  const tabIndex = (index: any) => {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  return (
    <div>
      {(!account) ?
       <div>
        <AppBar
          position="static"
        >
          <Tabs
            value={value}
            onChange={handleValueChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className="tabs"
          >
            <Tab label="Login" {...tabIndex(0)} />
            <Tab label="SignUp" {...tabIndex(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Login account={account} handleAccountCookies={handleAccountCookies} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp handleAccountCookies={handleAccountCookies} />
        </TabPanel>
      </div>
      :
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
      }
    </div>
  )
}