import React, { useState, useEffect } from "react";

import OrderRow from "../../Components/OrderRow/OrderRow";

import { getAllOrders } from "../../services/order";
import TOrder from "../../types/Order";

interface Props {
}

function CustomerOrders(props: Props) {

  const [ orders, setOrders ] = useState<TOrder[]>([]);
  const [ newOrder, setNewOrder ] = useState<TOrder | undefined>(undefined);

  let events: EventSource;


  useEffect(() => {
    const fetchData = async () => {
      setOrders(await getAllOrders());
    };

    fetchData();

    events = new EventSource("/api/v1/order/stream", {
      withCredentials: true
    });

    events.onmessage = (event) => {
      const order = JSON.parse(event.data);
      if (order === "Connection Created") { return; }
      setNewOrder(order);
    };

  }, [])

  useEffect(() => {
    if (!newOrder) { return; }
    setOrders([newOrder, ...orders]);
  }, [newOrder])

  return (
    <div>
      <h3>Customer Orders</h3>
      {orders.map((order: TOrder) => {
        return (
          <OrderRow order={order} />
        )
      })}
    </div>
  )
}

export default CustomerOrders;