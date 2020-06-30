import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import OrderRow from "../../Components/OrderRow/OrderRow";

import { getAllOrders } from "../../services/order";
import TOrder from "../../types/Order";
import TAccount from "../../types/Account";

interface Props {
  account: TAccount | undefined;
}

function CustomerOrders(props: Props) {
  const { account } = props;
  const history = useHistory();

  const [ orders, setOrders ] = useState<TOrder[]>([]);
  const [ newOrder, setNewOrder ] = useState<TOrder | undefined>(undefined);

  let events: EventSource;

  useEffect(() => {
    if (!account) {
      return history.push("/login?redirect=customerorders");
    } else if (!account.IsAdmin) {
      return history.push('/');
    }
    
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
          <OrderRow order={order} canChangeStatus={true} />
        )
      })}
    </div>
  )
}

export default CustomerOrders;