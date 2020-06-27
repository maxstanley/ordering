import React, { useState, useEffect } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import Loading from "../../Components/Loading/Loading";
import OrderRow from "../../Components/OrderRow/OrderItem/OrderItem";

import { getUserOrders } from "../../services/order";

import TOrder from "../../types/Order";
import Account from "../../types/Account";

interface Props {
  order: TOrder;
}

function Orders(props: Props) {
  console.log("Order Row")
  const { order } = props;

  const date = new Date(order.Date);
  let totalPrice = 0;
  order.Basket.forEach((orderItem: any) => {
    totalPrice += orderItem.Price * orderItem.Quantity;
  });

  console.log(order);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{date.toLocaleString().replace(',', '').slice(0, -3)} - £{totalPrice.toFixed(2)}</Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <div>
          {order.Basket.map((orderItem: any) => {
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