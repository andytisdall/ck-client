import { useState } from "react";
import { useDispatch } from "react-redux";

import { useCreateManualSupplyOrderMutation } from "../../../state/apis/volunteerApi/homeChefApi";
import { SupplyOrderInfo } from "../../../state/apis/volunteerApi/homeChefApi/types";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import Loading from "../../reusable/loading/Loading";

const NewOrder = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [items, setItems] = useState<SupplyOrderInfo>({
    containers: 0,
    labels: 0,
    sandwich: 0,
    soup: 0,
  });

  const [createSupplyOrder, { isLoading }] =
    useCreateManualSupplyOrderMutation();
  const dispatch = useDispatch();

  if (menuOpen) {
    return (
      <div className="admin-supply-order-create">
        <div
          onClick={() => setMenuOpen(false)}
          className="admin-supply-order-x"
        >
          x
        </div>
        <h4>Create New Supply Order</h4>
        <div>
          <label>First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Containers</label>
          <input
            type="number"
            value={items.containers || ""}
            onChange={(e) =>
              setItems((current) => ({
                ...current,
                containers: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <label>Labels</label>
          <input
            type="number"
            value={items.labels || ""}
            onChange={(e) =>
              setItems((current) => ({
                ...current,
                labels: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <label>Soup Containers</label>
          <input
            type="number"
            value={items.soup || ""}
            onChange={(e) =>
              setItems((current) => ({
                ...current,
                soup: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <label>Sandwich Boxes</label>
          <input
            type="number"
            value={items.sandwich || ""}
            onChange={(e) =>
              setItems((current) => ({
                ...current,
                sandwich: parseInt(e.target.value),
              }))
            }
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            onClick={async () => {
              await createSupplyOrder({ firstName, lastName, items }).unwrap();
              setMenuOpen(false);
              dispatch(setAlert("Supply Order Created"));
            }}
          >
            Create
          </button>
        )}
      </div>
    );
  }
  return (
    <button
      onClick={() => setMenuOpen((current) => !current)}
      className="admin-supply-order-btn"
    >
      Manually Create Supply Order
    </button>
  );
};

export default NewOrder;
