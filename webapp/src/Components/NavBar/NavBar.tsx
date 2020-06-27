import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ShoppingBasket as BasketIcon
} from "@material-ui/icons";

import TAccount from "../../types/Account";

import "./NavBar.css";

interface Props {
  basketQuantity: number;
  account: TAccount | undefined;
};

function NavBar(props: Props) {

  const { account, basketQuantity } = props;

  const [ isMenuOpen, setMenuOpen ] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }

  const renderMenu = (
    <Menu
      keepMounted
      open={isMenuOpen}
      onClose={toggleMenu}
    >
      <MenuItem
        onClick={toggleMenu}
        component={Link}
        to="/"
      >Home</MenuItem>
      <MenuItem
        onClick={toggleMenu}
        component={Link}
        to="/order"
      >Orders</MenuItem>
      <MenuItem
        onClick={toggleMenu}
        component={Link}
        to="/account"
      >Account</MenuItem>
      {(account && account.IsAdmin) ?
      <MenuItem
        onClick={toggleMenu}
        component={Link}
        to="/customerorders"
      >View Customer Orders</MenuItem> : null  }
    </Menu>
  );

  return (
    <div>
      <AppBar
        position="static"
        title="Ordering"
      >
        <Toolbar>
          <IconButton
            aria-label="menu"
            aria-haspopup="true"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
          >
            Ordering
          </Typography>
          <div className="rightToolbar">
            <Link to="/basket">
              <IconButton
                aria-label="basket"
              >
                <Badge
                  color="secondary"
                  badgeContent={basketQuantity}
                  max={999}
                >
                  <BasketIcon />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
}

export default NavBar;