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
import OrderRow from "../../Components/OrderRow/OrderRow";

import { getUserOrders } from "../../services/order";

import TOrder from "../../types/Order";
import Account from "../../types/Account";

interface Props {
  account: Account | undefined;
}

function Orders(props: Props) {
  const { account } = props;
  const history = useHistory();

  const [ orders, setOrders ] = useState<TOrder[]>();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  // const [ totalPrice, setTotalPrice ] = useState<number>(0);

  useEffect(() => {
    if (!account) {
      return history.push("/login?redirect=order");
    }

    const getData = async () => {
      const getOrders: TOrder[] = await getUserOrders(account.AccountID);
      setOrders(getOrders);
    }

    getData();
  }, []);

  useEffect(() => {
    if (orders) {
      setIsLoading(false);
    }
  }, [orders]);

  if (isLoading) { return <Loading /> }

  return (
    <div>
      <h4>Orders</h4>
      {orders?.map((order: TOrder) => {
        return (
          <OrderRow order={order} />
        )
      })}
    </div>
  )
}

export default Orders;