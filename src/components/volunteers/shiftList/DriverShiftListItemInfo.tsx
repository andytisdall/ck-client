import { addHours, formatISO } from "date-fns";
import { Link } from "react-router-dom";

import { Shift } from "../../../state/apis/volunteerApi/types";
import { PropsWithChildren } from "react";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import { formatDate, formatTime, isCarBigEnough } from "../formatDateTime";

const DriverShiftListItemInfo = ({
  shift,
  isAvailable,
  linkUrl,
  children,
}: {
  shift: Shift;
  isAvailable: boolean;
  linkUrl: string;
} & PropsWithChildren) => {
  const { data: driver } = useGetDriverQuery();

  const formattedStartDate = formatDate(shift.startTime);
  const formattedStartTime = formatTime(shift.startTime);
  const endTime = formatISO(
    addHours(new Date(shift.startTime), shift.duration)
  );
  const formattedEndTime = formatTime(endTime);

  const carIsBigEnough = isCarBigEnough({
    requirement: shift.carSizeRequired,
    userCar: driver?.car.size,
  });
  const disabled =
    isAvailable && carIsBigEnough ? "" : "volunteers-unavailable";

  const renderContent = () => {
    return (
      <div className={`volunteers-shift ${disabled}`}>
        <div className="volunteers-shift-date">
          <span>&bull; </span>
          <div>
            {formattedStartDate}
            <div className={`volunteers-shift-date-time ${disabled}`}>
              Pickup window: {formattedStartTime} - {formattedEndTime}
            </div>
          </div>
        </div>

        {shift.slots !== null && (
          <>
            <div className="volunteers-shift-space"></div>
            <ul>
              <li>Minimum vehicle size required: {shift.carSizeRequired}</li>
              <li>Distance: {shift.distance}</li>
            </ul>
          </>
        )}
        {children}
      </div>
    );
  };

  if (disabled) {
    return <div>{renderContent()}</div>;
  }

  return <Link to={linkUrl}>{renderContent()}</Link>;
};

export default DriverShiftListItemInfo;
