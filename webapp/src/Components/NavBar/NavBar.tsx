import React, { useState } from "react";
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

import "./NavBar.css";

interface Props {
  basketQuantity: number;
};

function NavBar(props: Props) {

  const { basketQuantity } = props;

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
        href="/"
      >Home</MenuItem>
      <MenuItem
        onClick={toggleMenu}
        href="/order"
      >Orders</MenuItem>
      <MenuItem
        onClick={toggleMenu}
        href="/account"
      >Account</MenuItem>
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
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
}

export default NavBar;