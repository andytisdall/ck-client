import { useParams, useNavigate } from "react-router-dom";
import { useState, FormEventHandler } from "react";
import { format, utcToZonedTime } from "date-fns-tz";

import {
  useGetShiftsQuery,
  useSignUpForHomeChefShiftMutation,
} from "../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../reusable/loading/Loading";

const ShiftDetail = () => {
  const [mealCount, setMealCount] = useState("");
  const [soup, setSoup] = useState(false);

  const { data, isLoading } = useGetShiftsQuery();
  const [signUpForShift, signUpForShiftResult] =
    useSignUpForHomeChefShiftMutation();

  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const { shiftId } = useParams();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    if (job && shift && shiftId) {
      e.preventDefault();
      signUpForShift({
        shiftId,
        mealCount,
        jobId: job.id,
        date: shift.startTime,
        soup,
      })
        .unwrap()
        .then((hours) => navigate("/home-chef/signup/confirm/" + hours.id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const shift = shifts && shiftId ? shifts[shiftId] : null;
  const job = jobs?.find((j) => j.id === shift?.job);

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div className="shift-detail">
      <h3>Sign up for this delivery:</h3>
      <div className="signup-form-item">
        <strong>Date: </strong>
        {format(
          utcToZonedTime(shift.startTime, "America/Los_Angeles"),
          "eeee, M/d/yy"
        )}
      </div>
      <div className="signup-form-item">
        <strong>Fridge: </strong>
        {job?.name}
      </div>
      <div className="signup-form-item">
        <strong>Address: </strong>
        {job?.location}
      </div>
      {!!job?.locationInfo && (
        <div className="signup-form-item">
          <strong>Location Notes: </strong>
          {job.locationInfo}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="signup-form-item">
          <div className="signup-form-meal-count">
            <div>
              <label htmlFor="meal-count">
                <strong>Number of Meals:</strong>
              </label>
              <div className="shift-detail-meal-number-note">
                (You can change this later)
              </div>
            </div>
            <input
              type="number"
              placeholder="25"
              min={1}
              max={99}
              required
              id="meal-count"
              value={mealCount}
              onChange={(e) => setMealCount(e.target.value)}
              className="signup-form-input"
            />
          </div>
        </div>
        <div className="signup-form-item">
          <p>
            <strong>Type of Meal:</strong>
          </p>
          <div className="signup-form-meal-type-option">
            <input
              type="radio"
              onChange={() => setSoup(false)}
              name="soup"
              checked={!soup}
            />
            <label>Entree</label>
          </div>
          <div className="signup-form-meal-type-option">
            <input type="radio" onChange={() => setSoup(true)} name="soup" />
            <label>Soup</label>
          </div>
        </div>

        {signUpForShiftResult.isLoading ? (
          <Loading />
        ) : (
          <input
            type="submit"
            className="shift-detail-submit"
            value="Sign Up"
          />
        )}
      </form>
      {!!job?.notes && (
        <div className="signup-form-notes">
          <strong>Note: </strong>
          {job.notes}
        </div>
      )}
    </div>
  );
};

export default ShiftDetail;
