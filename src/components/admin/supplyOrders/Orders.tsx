import { useState } from "react";
import FulfilledOrders from "./FulfilledOrders";
import NewOrder from "./NewOrder";
import UnfulfilledOrders from "./UnfulfilledOrders";

const Orders = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <UnfulfilledOrders />
      <NewOrder />
      <hr />
      {open ? (
        <FulfilledOrders />
      ) : (
        <button onClick={() => setOpen(true)}>
          Click here to see fulfilled orders
        </button>
      )}
    </div>
  );
};

export default Orders;
