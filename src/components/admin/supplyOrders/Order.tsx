import { PropsWithChildren } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { SupplyOrder } from "@community-kitchens/apiinterfaces";

import Loading from "../../reusable/loading/Loading";
import {
  useDeleteSupplyOrderMutation,
  useSendReminderMutation,
} from "../../../state/apis/volunteerApi/homeChefApi";
import { setAlert } from "../../../state/apis/slices/alertSlice";

const Order = ({
  order,
  children,
}: { order: SupplyOrder } & PropsWithChildren) => {
  const [deleteOrder] = useDeleteSupplyOrderMutation();
  const [sendReminder, { isLoading }] = useSendReminderMutation();

  const dispatch = useDispatch();

  const renderDelete = () => {
    return (
      <div
        className="admin-supply-order-x"
        onClick={async () => {
          await deleteOrder({ id: order.id }).unwrap();
          dispatch(setAlert("Order Deleted"));
        }}
      >
        X
      </div>
    );
  };

  const renderReminder = () => {
    return isLoading ? (
      <Loading />
    ) : (
      <button
        onClick={async () => {
          await sendReminder({ orderId: order.id }).unwrap();
          dispatch(setAlert("Reminder Sent"));
        }}
      >
        Send Reminder
      </button>
    );
  };

  return (
    <div key={order.id} className="admin-supply-order">
      {children}
      <div className="admin-supply-order-field admin-supply-order-name">
        <label>Name</label>
        <div>
          {order.contact.firstName} {order.contact.lastName}
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
      {order.fulfilled ? renderReminder() : renderDelete()}
    </div>
  );
};

export default Order;
