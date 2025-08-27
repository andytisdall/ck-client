import { useState } from "react";
import { useDispatch } from "react-redux";

import { setAlert } from "../../../state/apis/slices/alertSlice";
import {
  useGetSupplyOrdersQuery,
  useUpdateSupplyOrdersMutation,
} from "../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../reusable/loading/Loading";
import "./Orders.css";
import Order from "./Order";

const UnfulfilledOrders = () => {
  const [ordersToUpdate, setOrdersToUpdate] = useState<string[]>([]);

  const { data: orders, isLoading } = useGetSupplyOrdersQuery();

  const [updateOrders, { isLoading: mutationIsLoading }] =
    useUpdateSupplyOrdersMutation();

  const dispatch = useDispatch();

  if (isLoading || mutationIsLoading) {
    return <Loading />;
  }

  const btnStyle = !ordersToUpdate.length ? "btn-inactive" : "";

  return (
    <div>
      <h2>Home Chef supply orders: Unfulfilled</h2>
      {orders
        ?.filter((o) => !o.fulfilled)
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .map((order) => {
          const renderCheck = () => {
            if (order.fulfilled) {
              return <div className="meal-report-check">&#9989;</div>;
            }
            return (
              <input
                type="checkbox"
                checked={ordersToUpdate.includes(order.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setOrdersToUpdate((current) => [...current, order.id]);
                  } else {
                    setOrdersToUpdate((current) =>
                      current.filter((id) => id !== order.id)
                    );
                  }
                }}
              />
            );
          };

          return <Order order={order}>{renderCheck()}</Order>;
        })}
      {!orders?.length ? (
        <div>No Orders Found</div>
      ) : (
        <button
          className={btnStyle + " admin-supply-order-btn"}
          onClick={async () => {
            await updateOrders({ orders: ordersToUpdate });
            dispatch(setAlert("Orders Updated Successfully"));
          }}
        >
          Update selected orders as fulfilled
        </button>
      )}
    </div>
  );
};

export default UnfulfilledOrders;
