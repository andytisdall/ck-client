import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import { formatISO, addHours } from "date-fns";

import { VolunteerShift } from "@community-kitchens/apiinterfaces";
import { formatDate, formatTime } from "../formatDateTime";

const ShiftListItemInfo = ({
  shift,
  isAvailable,
  linkUrl,
  children,
  driver,
}: {
  shift: VolunteerShift;
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

  const volunteersNeeded =
    shift.slots && shift.totalSlots
      ? `${shift.slots}  Volunteers Needed`
      : isAvailable && shift.totalSlots
        ? "1 Volunteer Needed"
        : isAvailable
          ? "Available for Signup"
          : "No Signups Available";

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
            {volunteersNeeded}
          </div>
        )}
        {children}
      </div>
    </Link>
  );
};

export default ShiftListItemInfo;
