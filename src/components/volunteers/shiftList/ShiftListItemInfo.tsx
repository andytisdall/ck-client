import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import { formatISO, addHours } from "date-fns";

import { Shift } from "../../../state/apis/volunteerApi/types";
import { formatDate, formatTime } from "../formatDateTime";

const ShiftListItemInfo = ({
  shift,
  isAvailable,
  linkUrl,
  children,
  driver,
}: {
  shift: Shift;
  isAvailable: boolean;
  linkUrl: string;
  driver?: boolean;
} & PropsWithChildren) => {
  const available = isAvailable ? "" : "volunteers-unavailable";
  const formattedStartDate = formatDate(shift.startTime);
  const formattedStartTime = formatTime(shift.startTime);
  const endTime = formatISO(
    addHours(new Date(shift.startTime), shift.duration),
  );
  const formattedEndTime = formatTime(endTime);

  return (
    <Link to={linkUrl}>
      <div className={`volunteers-shift ${available}`}>
        <div>
          &bull; {formattedStartDate}
          <div className={`volunteers-shift-date-time ${available}`}>
            {driver && "Pickup window: "}
            {formattedStartTime} - {formattedEndTime}
          </div>
        </div>
        {shift.slots !== null && !driver && (
          <div className={`volunteers-shift-volunteers-needed ${available}`}>
            {shift.slots} volunteers needed
          </div>
        )}
        {children}
      </div>
    </Link>
  );
};

export default ShiftListItemInfo;
