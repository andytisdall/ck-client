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

  const [meals, setMeals] = useState<string[]>([]);
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
  const cannotAddMeals = mealsThisMonth.length >= mealMax;

  const maxReachedForThisSesh = mealsThisMonth.length + meals.length >= mealMax;

  const renderAddMeals = () => {
    return (
      <div className="doorfront-col">
        <h4>Client is receiving {meals.length} meals</h4>
        {maxReachedForThisSesh && (
          <div className="doorfront-alert">Cannot add more meals</div>
        )}

        <button
          className={maxReachedForThisSesh ? "btn-inactive" : ""}
          onClick={() => {
            if (!maxReachedForThisSesh) setMeals([...meals, "Meal"]);
          }}
        >
          Add Meal
        </button>
        <button
          className={meals.length === 0 ? "btn-inactive" : ""}
          onClick={() => {
            const newMeals = [...meals];
            newMeals.pop();
            setMeals(newMeals);
          }}
        >
          Subtract Meal
        </button>
        <ul>
          {meals.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="doorfront-btns">
          <button
            className={meals.length ? "" : "btn-inactive"}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const renderCannotAdd = () => {
    return (
      <div>
        This client has reached their maximum amount of meals and may not add
        more for this period.
      </div>
    );
  };

  const renderPastMeals = () => {
    return (
      <div className="doorfront-col">
        <h4>Past Meals ({pastMeals.length}):</h4>
        <ul>
          {pastMeals?.map((meal) => (
            <li key={meal.id}>{format(new Date(meal.date), "M/d/yy")}</li>
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
      <div className="doorfront-btns">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddMeals;
