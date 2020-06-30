import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import {
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

import OrderRow from "../../Components/OrderRow/OrderItem/OrderItem";

import { updateOrderStatus } from "../../services/order";

import TOrder, { Status } from "../../types/Order";
import TAccount from "../../types/Account";

import "./OrderRow.css"

interface Props {
  order: TOrder;
  canChangeStatus: Boolean;
}

function Orders(props: Props) {
  const { canChangeStatus, order } = props;

  const [ isMenuOpen, setMenuOpen ] = useState(false);
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ updatedLocally, setUpdatedLocally ] = useState(false);

  useEffect(() => {
    if (updatedLocally) {
      updateOrderStatus(order);
      setUpdatedLocally(false)
    }
  }, [order.Status]);

  const date = new Date(order.Date);
  let totalPrice = 0;
  Object.keys(order.Basket).forEach((orderItemKey: string) => {
    const orderItem = order.Basket[orderItemKey];
    totalPrice += orderItem.Price * orderItem.Quantity;
  });

  const toggleMenu = (event?: MouseEvent<HTMLDivElement> | MouseEvent<HTMLLIElement>, newStatus: string = order.Status) => {
    if (event && canChangeStatus) { event.stopPropagation(); }
    
    setMenuOpen(!isMenuOpen);
    let newStatusTyped = newStatus as keyof typeof Status;
    setUpdatedLocally(true);
    if (newStatusTyped !== order.Status) { order.Status = Status[newStatusTyped]; }
    setIsExpanded(false);
  }

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  }

  const renderMenu = (
    <Menu
      keepMounted
      open={isMenuOpen}
      onClose={() => toggleMenu()}
    >
      <MenuItem
        onClick={(e) => toggleMenu(e, "PENDING")}
      >Pending</MenuItem>
      <MenuItem
        onClick={(e) => toggleMenu(e, "PREPARING")}
      >Preparing</MenuItem>
      <MenuItem
        onClick={(e) => toggleMenu(e, "READY")}
      >Ready</MenuItem>
      <MenuItem
        onClick={(e) => toggleMenu(e, "COLLECTED")}
      >Collected</MenuItem>
      <MenuItem
        onClick={(e) => toggleMenu(e, "CANCELLED")}
      >Cancelled</MenuItem>
    </Menu>
  );

  const getStatus = () => {
    switch (order.Status) {
      case "PENDING": 
        return ( <Chip clickable onClick={(e) => toggleMenu(e)} size="small" label="Pending" className="chip pending" /> )
      case "PREPARING":
        return ( <Chip clickable onClick={(e) => toggleMenu(e)} size="small" label="Preparing" className="chip preparing" /> )
      case "READY":
        return ( <Chip clickable onClick={(e) => toggleMenu(e)} size="small" label="Ready" className="chip ready" /> )
      case "COLLECTED":
        return ( <Chip clickable onClick={(e) => toggleMenu(e)} size="small" label="Collected" className="chip collected" /> )
      case "CANCELLED":
        return ( <Chip clickable onClick={(e) => toggleMenu(e)} size="small" label="Cancelled" className="chip cancelled" /> )
      default:
        return ( <Chip clickable onClick={(e) => toggleMenu(e)} size="small" label="UNKNOWN" /> )
    }
  }

  return (
    <ExpansionPanel
      expanded={isExpanded}
      onClick={(e) => e.stopPropagation()}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={togglePanel}
      >
        <Typography>{("0" + date.getDate()).slice(-2)}/{("0" + date.getMonth()).slice(-2)} - £{totalPrice.toFixed(2)}</Typography>
        {getStatus()}{(canChangeStatus) ? renderMenu : null}
      </ExpansionPanelSummary>


      <ExpansionPanelDetails>
        <div>
          {(order.Message) ? <p className="text"><b>Message: </b>{order.Message}</p> : null}
          {Object.keys(order.Basket).map((orderItemKey: any) => {
            const orderItem = order.Basket[orderItemKey];
            return (
              <OrderRow orderItem={orderItem} />
            )
          })}
        </div>
      </ExpansionPanelDetails>

    </ExpansionPanel>
  )
}

export default Orders;