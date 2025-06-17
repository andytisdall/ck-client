import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { format, getMonth } from "date-fns";
import { useDispatch } from "react-redux";

import "./Doorfront.css";
import {
  useGetClientMealsQuery,
  useAddMealsMutation,
} from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";
import { setAlert } from "../../../state/apis/slices/alertSlice";

const mealMax = 30;

const AddMeals = () => {
  const { clientId } = useParams();

  const [meals, setMeals] = useState(1);
  const [addMeals, { isLoading: addIsLoading }] = useAddMealsMutation();

  const { data: pastMeals, isLoading: getIsLoading } = useGetClientMealsQuery(
    clientId || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = addIsLoading || getIsLoading;
  if (isLoading) {
    return <Loading />;
  }

  if (!clientId || !pastMeals) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <button onClick={() => navigate("..")}>Back</button>
      </div>
    );
  }

  const onSubmit = async () => {
    await addMeals({ clientId, meals }).unwrap();
    dispatch(setAlert("Data Entered Sucessfully"));
    navigate("..");
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
        <h3>{`${meals} meal${meals === 1 ? "" : "s"}`}</h3>
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

  const renderPastMeals = () => {
    return (
      <div className="doorfront-col">
        <b>Meals received this month ({numberOfMealsThisMonth}):</b>
        <ul>
          {mealsThisMonth
            ?.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
            .map((meal) => (
              <li
                key={meal.id}
              >{`${format(new Date(meal.date), "M/d/yy")} - ${meal.amount} meal${meal.amount === 1 ? "" : "s"}`}</li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="doorfront">
        {cannotAddMeals ? renderCannotAdd() : renderAddMeals()}
        {renderPastMeals()}
      </div>
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
    </div>
  );
};

export default AddMeals;
