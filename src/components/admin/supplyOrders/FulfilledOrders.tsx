import { useGetSupplyOrdersQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../reusable/loading/Loading";
import "./Orders.css";
import Order from "./Order";

const FulfilledOrders = () => {
  const { data: orders, isLoading } = useGetSupplyOrdersQuery();

  if (isLoading) {
    return <Loading />;
  }

  const fulfilledOrders = orders
    ?.filter((o) => o.fulfilled)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="admin-supply-order-list">
      <h2>Home Chef supply orders: Fulfilled</h2>
      {fulfilledOrders?.map((order) => {
        return <Order order={order} />;
      })}
      {!fulfilledOrders?.length && <div>No Orders Found</div>}
    </div>
  );
};

export default FulfilledOrders;
