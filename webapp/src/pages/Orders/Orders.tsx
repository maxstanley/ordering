import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Loading from "../../Components/Loading/Loading";
import OrderRow from "../../Components/OrderRow/OrderRow";

import { getUserOrders } from "../../services/order";

import TOrder from "../../types/Order";
import TAccount from "../../types/Account";

interface Props {
  account: TAccount | undefined;
}

function Orders(props: Props) {
  const { account } = props;
  const history = useHistory();

  const [ orders, setOrders ] = useState<TOrder[]>([]);
  const [ newOrder, setNewOrder ] = useState<TOrder | undefined>(undefined);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  
  let events: EventSource;

  useEffect(() => {
    if (!account) {
      return history.push("/login?redirect=order");
    }

    const getData = async () => {
      const getOrders: TOrder[] = await getUserOrders(account.AccountID);
      setOrders(getOrders);
    }

    getData();

    events = new EventSource("/api/v1/order/stream?customer=true", {
      withCredentials: true
    });

    events.onmessage = (event) => {
      const order = JSON.parse(event.data);
      if (order === "Connection Created") { return; }
      setNewOrder(order);
    };
  }, []);

  useEffect(() => {
    if (orders) {
      setIsLoading(false);
    }
  }, [orders]);

  useEffect(() => {
    if (!newOrder) { return; }
    const newOrders = [...orders];
    newOrders.some((order, index) => {
      if (order._id !== newOrder._id) { return false; }
      newOrders[index] = newOrder;
      return true;
    });
    setOrders(newOrders);
  }, [newOrder])

  if (isLoading) { return <Loading /> }

  return (
    <div>
      <h4>Orders</h4>
      {orders!.map((order: TOrder) => {
        return (
          <OrderRow order={order} canChangeStatus={false} />
        )
      })}
    </div>
  )
}

export default Orders;