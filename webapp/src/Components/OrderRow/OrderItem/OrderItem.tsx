import React from "react";

import "./OrderItem.css";

interface Props {
  orderItem: any;
}

function OrderRow(props: Props) {

  const { orderItem } = props;
  const { Name, Measure, Quantity } = orderItem;

  return (
    <p className="text">{Quantity} x {Measure} of {Name}</p>
  )
}

export default OrderRow;