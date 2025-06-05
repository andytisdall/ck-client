import { useParams, useNavigate } from "react-router-dom";
import { useState, FormEventHandler } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import { useDispatch } from "react-redux";

import "./ChefShifts.css";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import Loading from "../../reusable/loading/Loading";
import {
  useEditHoursMutation,
  useGetHomeChefHoursQuery,
  useGetShiftsQuery,
} from "../../../state/apis/volunteerApi/homeChefApi";

const EditShift = () => {
  const { id } = useParams();

  const { data: hours, isLoading: hoursLoading } = useGetHomeChefHoursQuery();
  const hour = hours && id ? hours[id] : undefined;

  const [mealCount, setMealCount] = useState(hour?.mealCount || "");
  const [mealType, setMealType] = useState(hour?.mealType);
  const [cancel, setCancel] = useState(false);

  const { data } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const dispatch = useDispatch();

  const [editHours, { isLoading }] = useEditHoursMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if ((!mealCount || parseInt(mealCount, 10) < 1) && !cancel) {
      throw Error("Invalid number of meals");
    }
    if (jobs) {
      const fridge = jobs.find((j) => j.id === hour?.job)?.name;
      if (id && fridge && hour && mealType)
        editHours({ id, mealCount, cancel, fridge, date: hour.time, mealType })
          .unwrap()
          .then(() => {
            const action = cancel ? "Canceled" : "Edited";
            dispatch(setAlert("Delivery " + action));
            navigate("..");
          });
    }
  };

  if (hoursLoading) {
    return <Loading />;
  }

  const renderCancel = () => {
    let text;
    if (hour?.status === "Confirmed") {
      text = "Check here to cancel this delivery";
    }
    if (hour?.status === "Completed") {
      text = "Check here if you did not make this delivery";
    }
    return (
      <div className="chef-cancel">
        <input
          type="checkbox"
          id="cancel"
          checked={cancel}
          onChange={(e) => setCancel(e.target.checked)}
        />
        <label htmlFor="cancel">{text}</label>
      </div>
    );
  };

  const meals = cancel ? 0 : mealCount;

  if (!hour) {
    return <div>This shift cannot be edited.</div>;
  }

  return (
    <>
      <h2>Edit Home Chef Delivery Details</h2>

      <form onSubmit={onSubmit} className="volunteer-edit">
        <h3>
          Date:{" "}
          <span className="edit-shift-date">
            {format(
              utcToZonedTime(hour.time, "America/Los_Angeles"),
              "eee, M/d/yy"
            )}
          </span>
        </h3>
        <div>
          <label>Number of Meals:</label>
          <input
            type="number"
            value={meals}
            onChange={(e) => setMealCount(e.target.value)}
            required
          />
        </div>
        <div className="edit-chef-type">
          Type of Meal:
          <div>
            <input
              type="radio"
              name="meal-type"
              id="entree"
              onChange={(e) => {
                if (e.target.checked) {
                  setMealType("Entree");
                }
              }}
            />
            <label htmlFor="entree">Entree</label>
          </div>
          <div>
            <input
              type="radio"
              name="meal-type"
              id="soup"
              onChange={(e) => {
                if (e.target.checked) {
                  setMealType("Soup");
                }
              }}
            />
            <label htmlFor="soup">Soup</label>
          </div>
        </div>
        {renderCancel()}
        {isLoading ? <Loading /> : <input type="Submit" />}
      </form>
    </>
  );
};

export default EditShift;
