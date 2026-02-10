import { PropsWithChildren } from "react";
import { format } from "date-fns";

import { useDeleteSupplyOrderMutation } from "../../../state/apis/volunteerApi/homeChefApi";
import { SupplyOrder } from "../../../state/apis/volunteerApi/homeChefApi/types";

const Order = ({
  order,
  children,
}: { order: SupplyOrder } & PropsWithChildren) => {
  const [deleteOrder] = useDeleteSupplyOrderMutation();

  const renderDelete = () => {
    return (
      <div
        className="admin-supply-order-x"
        onClick={async () => {
          await deleteOrder({ id: order.id }).unwrap();
        }}
      >
        X
      </div>
    );
  };

  return (
    <div key={order.id} className="admin-supply-order">
      {children}
      <div>
        <label>Name</label>
        <div className="admin-supply-order-name">
          <div>{order.contact.firstName}</div>
          <div>{order.contact.lastName}</div>
        </div>
      </div>
      <div className="admin-supply-order-field">
        <label>Containers</label>
        <div> {order.items.containers}</div>
      </div>
      <div className="admin-supply-order-field">
        <label>Labels</label>
        <div> {order.items.labels}</div>
      </div>
      <div className="admin-supply-order-field">
        <label>Soup</label>
        <div> {order.items.soup}</div>
      </div>
      <div className="admin-supply-order-field">
        <label>Sandwich</label>
        <div> {order.items.sandwich}</div>
      </div>

      <div className="admin-supply-order-field">
        <label>Date</label>
        <div>{format(new Date(order.date), "M/d/yy")}</div>
      </div>

      {!order.fulfilled && renderDelete()}
    </div>
  );
};

export default Order;
