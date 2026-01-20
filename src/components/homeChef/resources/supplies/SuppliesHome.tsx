import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useOrderSuppliesMutation } from "../../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../../reusable/loading/Loading";
import SupplyBtn from "./SupplyBtn";
import { setAlert } from "../../../../state/apis/slices/alertSlice";
import "./Supplies.css";

const CONTAINER_UNIT = 25;
const LABEL_UNIT = 10;
const SOUP_UNIT = 24;
const SANDWICH_UNIT = 50;

const SuppliesHome = () => {
  const [labels, setLabels] = useState(0);
  const [containers, setContainers] = useState(0);
  const [soup, setSoup] = useState(0);
  const [sandwich, setSandwich] = useState(0);

  const [orderSupplies, { isLoading, isSuccess }] = useOrderSuppliesMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (btnActive) {
      await orderSupplies({ labels, containers, soup, sandwich }).unwrap();
      dispatch(setAlert("Supply order successfully placed!"));
    }
  };

  const btnActive = !isSuccess && (labels || containers || soup || sandwich);

  const btnStyle = btnActive ? "" : "btn-inactive";

  return (
    <div>
      <h3>Order Home Chef supplies to pick up from the CK Kitchen</h3>
      <div className="home-chef-supplies">
        <SupplyBtn
          onPress={(increment: number) =>
            setContainers((current) => current + increment * CONTAINER_UNIT)
          }
          value={containers}
        >
          <div className="supply-btn-label">
            <img
              src="/images/home-chef/meal-container.jpg"
              alt="Meal Container"
            />
            <strong>Containers:</strong>
            <span>(quantities of {CONTAINER_UNIT})</span>
          </div>
        </SupplyBtn>
        <SupplyBtn
          onPress={(increment: number) =>
            setLabels((current) => current + increment * LABEL_UNIT)
          }
          value={labels}
        >
          <div className="supply-btn-label">
            <img
              src="/images/home-chef/food-label-example.jpg"
              alt="meal label"
            />
            <strong>Labels:</strong>
            <span>(quantities of {LABEL_UNIT})</span>
          </div>
        </SupplyBtn>
        <SupplyBtn
          onPress={(increment: number) =>
            setSoup((current) => current + increment * SOUP_UNIT)
          }
          value={soup}
        >
          <div className="supply-btn-label">
            <img src="/images/home-chef/soup.jpeg" alt="soup container" />

            <strong>Soup Containers:</strong>
            <span>(quantities of {SOUP_UNIT})</span>
          </div>
        </SupplyBtn>
        <SupplyBtn
          onPress={(increment: number) =>
            setSandwich((current) => current + increment * SANDWICH_UNIT)
          }
          value={sandwich}
        >
          <div className="supply-btn-label">
            <img src="/images/home-chef/sandwich.jpeg" alt="sandwich box" />
            <strong>Sandwich Boxes:</strong>
            <span>(quantities of {SANDWICH_UNIT})</span>
          </div>
        </SupplyBtn>
      </div>
      <div className="supply-info">
        <div>
          <strong>Pickup at:</strong> CK Kitchen, 2270 Telegraph Ave, Oakland CA
          94612
        </div>
        <div>
          Your order will be ready for pickup within 48 hours. You will receive
          an email when your order is ready to pick up.
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="supply-controls">
          <button className="cancel" onClick={() => navigate("..")}>
            Back
          </button>
          <button className={btnStyle} onClick={onSubmit}>
            Submit Order
          </button>
          {isSuccess && (
            <div className="supply-success">👍 Your order was succesful!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuppliesHome;
