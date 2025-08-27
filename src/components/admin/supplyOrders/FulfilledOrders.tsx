import { useGetSupplyOrdersQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../reusable/loading/Loading";
import "./Orders.css";
import Order from "./Order";

const FulfilledOrders = () => {
  const { data: orders, isLoading } = useGetSupplyOrdersQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Home Chef supply orders: Fulfilled</h2>
      {orders
        ?.filter((o) => o.fulfilled)
        .sort((a, b) => (a.date > b.date ? -1 : 1))

        .map((order) => {
          return <Order order={order} />;
        })}
      {!orders?.length && <div>No Orders Found</div>}
    </div>
  );
};

export default FulfilledOrders;
