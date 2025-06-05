import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";

import { Shift } from "../../../state/apis/volunteerApi/types";
import { formatDate, formatTime } from "../formatDateTime";

const ShiftListItemInfo = ({
  shift,
  isAvailable,
  linkUrl,
  children,
}: {
  shift: Shift;
  isAvailable: boolean;
  linkUrl: string;
} & PropsWithChildren) => {
  const available = isAvailable ? "" : "volunteers-unavailable";
  const formattedStartDate = formatDate(shift.startTime);
  const formattedStartTime = formatTime(shift.startTime);

  return (
    <Link to={linkUrl}>
      <div className={`volunteers-shift ${available}`}>
        <div className="volunteers-shift-date">
          <span>&bull; </span>
          <div>
            {formattedStartDate}
            <div className="volunteers-shift-date-time">
              {formattedStartTime}
            </div>
          </div>
        </div>

        {shift.slots !== null && (
          <>
            <div className="volunteers-shift-space"></div>
            <div>{shift.slots} volunteers needed</div>
          </>
        )}
        {children}
      </div>
    </Link>
  );
};

export default ShiftListItemInfo;
