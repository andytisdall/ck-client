import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateDeliverToKitchenShiftMutation } from "../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../reusable/loading/Loading";
import { addDays, getDay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const DeliverToKitchen = () => {
  const [date, setDate] = useState("");
  const [localError, setLocalError] = useState("");

  const [createDeliverToKitchenShift, { isLoading }] =
    useCreateDeliverToKitchenShiftMutation();

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!validateDate()) {
      return setLocalError(
        "Date must be Sunday-Thursday and within the next 30 days"
      );
    }
    const { shiftId } = await createDeliverToKitchenShift({ date }).unwrap();
    navigate("../shift/" + shiftId);
  };

  const validateDate = () => {
    const dateDate = utcToZonedTime(date, "America/Los_Angeles");
    const invalidDays = [4, 5];
    const futureDateCutoff = addDays(new Date(), 30);
    return (
      !invalidDays.includes(getDay(dateDate)) &&
      dateDate > new Date() &&
      dateDate < futureDateCutoff
    );
  };

  return (
    <div>
      <h3>Deliver Home Chef Meals to the CK Kitchen</h3>
      <div className="deliver-to-kitchen">
        <p>
          You can deliver your meals directly to the CK Kitchen, and we'll
          distribute them to the community. We accept drop-offs Sunday-Thursday
          10am - 4pm, and you can schedule a drop off up to 30 days in advance.
        </p>
        <p>Please select a date below for your drop off.</p>
        <ul>
          <li>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <label>Select Dropoff Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                onClick={() => setLocalError("")}
              />
              {isLoading ? (
                <Loading />
              ) : (
                <input type="submit" value="Continue" />
              )}
            </form>
          </li>
        </ul>
        {!!localError && <div className="local-error">{localError}</div>}
      </div>
    </div>
  );
};

export default DeliverToKitchen;
