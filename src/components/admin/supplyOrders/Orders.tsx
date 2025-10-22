import FulfilledOrders from "./FulfilledOrders";
import NewOrder from "./NewOrder";
import UnfulfilledOrders from "./UnfulfilledOrders";

const Orders = () => {
  return (
    <div>
      <UnfulfilledOrders />
      <NewOrder />
      <hr />
      <FulfilledOrders />
    </div>
  );
};

export default Orders;
