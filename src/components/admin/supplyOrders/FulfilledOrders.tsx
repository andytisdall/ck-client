import { useGetFulfilledSupplyOrdersQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../reusable/loading/Loading";
import "./Orders.css";
import Order from "./Order";

const FulfilledOrders = () => {
  const { data: orders, isLoading } = useGetFulfilledSupplyOrdersQuery();

  if (isLoading) {
    return <Loading />;
  }

  const sortedFulfilledOrders = orders
    ? [...orders].sort((a, b) => (a.date > b.date ? -1 : 1))
    : undefined;

  return (
    <div className="admin-supply-order-list">
      <h2>Home Chef supply orders: Fulfilled</h2>
      {sortedFulfilledOrders?.map((order) => {
        return <Order order={order} />;
      })}
      {!sortedFulfilledOrders?.length && <div>No Orders Found</div>}
    </div>
  );
};

export default FulfilledOrders;
