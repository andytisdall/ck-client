import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMonth } from "date-fns";
import { useDispatch } from "react-redux";

import {
  useGetClientQuery,
  useAddMealsMutation,
} from "../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../reusable/loading/Loading";
import { setAlert } from "../../state/apis/slices/alertSlice";
import PastMeals from "./PastMeals";
import ClientInfo from "./Client";

const mealMax = 30;

const AddMeals = () => {
  const { barcodeValue } = useParams();

  const [meals, setMeals] = useState(1);
  const [cCode, setCcode] = useState("");

  const [addMeals, { isLoading: addIsLoading }] = useAddMealsMutation();

  const { data, isLoading: getIsLoading } = useGetClientQuery(
    barcodeValue || ""
  );

  const pastMeals = data?.clientMeals;
  const client = data?.client;
  const clientId = client?.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = addIsLoading || getIsLoading;
  if (isLoading) {
    return <Loading />;
  }

  if (!barcodeValue || !pastMeals) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <button onClick={() => navigate("..")}>Back</button>
      </div>
    );
  }

  const onSubmit = async () => {
    if (clientId) {
      const numberOfMeals = cannotAddMeals ? 0 : meals;
      await addMeals({ clientId, meals: numberOfMeals, cCode }).unwrap();
      dispatch(setAlert("Data Entered Sucessfully"));
      navigate("..");
    }
  };

  const mealsThisMonth = pastMeals?.filter(
    (meal) => getMonth(new Date(meal.date)) === getMonth(new Date())
  );
  const numberOfMealsThisMonth = mealsThisMonth.reduce(
    (prev, cur) => prev + cur.amount,
    0
  );

  const cannotAddMeals = numberOfMealsThisMonth >= mealMax;

  const maxReachedForThisSesh = numberOfMealsThisMonth + meals >= mealMax;

  const renderAddMeals = () => {
    return (
      <div className="doorfront-col">
        <b>Client is receiving</b>
        <h3 className="doorfront-meal-count">{`${meals} meal${meals === 1 ? "" : "s"}`}</h3>
        {maxReachedForThisSesh && (
          <div className="doorfront-alert">Cannot add more meals</div>
        )}

        <div className="doorfront-btns">
          <button
            className={
              "doorfront-btn-sub doorfront-btn " +
              (meals === 1 ? "btn-inactive" : "")
            }
            onClick={() => {
              if (meals > 1) {
                setMeals((current) => current - 1);
              }
            }}
          >
            -
          </button>
          <button
            className={
              "doorfront-btn-add doorfront-btn " +
              (maxReachedForThisSesh ? "btn-inactive" : "")
            }
            onClick={() => {
              if (!maxReachedForThisSesh) {
                setMeals((current) => current + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const renderCannotAdd = () => {
    return (
      <div className="doorfront-col">
        This client has reached their maximum amount of meals and may not add
        more for this period.
      </div>
    );
  };

  const renderControls = () => {
    return (
      <div className="doorfront-submit-row">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button
          className={"doorfront-submit" + (meals > 0 ? "" : "btn-inactive")}
          onClick={onSubmit}
        >
          Submit
        </button>
        <div />
      </div>
    );
  };

  if (!clientId) {
    return <div>Error</div>;
  }

  return (
    <div>
      <ClientInfo client={client} setCcode={setCcode} />
      <div className="doorfront">
        {cannotAddMeals ? renderCannotAdd() : renderAddMeals()}
        <PastMeals meals={pastMeals} />
      </div>
      {renderControls()}
    </div>
  );
};

export default AddMeals;
