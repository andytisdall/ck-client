import { addHours, formatISO } from "date-fns";
import { Link } from "react-router-dom";

import { Shift } from "../../../state/apis/volunteerApi/types";
import { PropsWithChildren } from "react";
import { formatDate, formatTime } from "../formatDateTime";

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
  const formattedStartDate = formatDate(shift.startTime);
  const formattedStartTime = formatTime(shift.startTime);
  const endTime = formatISO(
    addHours(new Date(shift.startTime), shift.duration)
  );
  const formattedEndTime = formatTime(endTime);

  const disabledStyle = isAvailable ? "" : "volunteers-unavailable";

  const renderContent = () => {
    return (
      <div className={`volunteers-shift ${disabledStyle}`}>
        <div className="volunteers-shift-date">
          <span>&bull; </span>
          <div>
            {formattedStartDate}
            <div className={`volunteers-shift-date-time ${disabledStyle}`}>
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

  if (!isAvailable) {
    return <div>{renderContent()}</div>;
  }

  return <Link to={linkUrl}>{renderContent()}</Link>;
};

export default DriverShiftListItemInfo;
