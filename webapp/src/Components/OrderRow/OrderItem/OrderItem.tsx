import React from "react";

interface Props {
  orderItem: any;
}

function OrderRow(props: Props) {

  const { orderItem } = props;
  const { Name, Measure, Quantity } = orderItem;

  return (
    <div>
      <p>{Name} - {Measure} - {Quantity}</p>
    </div>
  )
}

export default OrderRow;