import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { isCarBigEnough } from "../formatDateTime";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import { Shift } from "../../../state/apis/volunteerApi/types";
import "./DriverCalendar.css";

const DriverCalendarShift = ({
  shift,
  linkUrl,
  children,
  index,
}: {
  shift: Shift;
  linkUrl?: string;
  index: number;
} & PropsWithChildren) => {
  const { data: driver } = useGetDriverQuery();
  const navigate = useNavigate();

  const carIsBigEnough =
    driver &&
    isCarBigEnough({
      requirement: shift.carSizeRequired,
      userCar: driver?.car.size,
    });

  const shiftDisabled = !linkUrl || !carIsBigEnough;

  return (
    <div
      key={shift.id}
      className={
        "calendar-item calendar-color-" +
        index +
        (shiftDisabled ? " calendar-shift-disabled" : "")
      }
      onClick={() => {
        if (!shiftDisabled) {
          navigate(linkUrl);
        }
      }}
    >
      {/* <div>
        Window: {format(new Date(shift.startTime), "hh:mm")} -{" "}
        {format(new Date(shift.endTime), "hh:mm")}
      </div> */}
      <div className="volunteers-calendar-spots">{shift.distance}</div>
      {children}
    </div>
  );
};

export default DriverCalendarShift;
