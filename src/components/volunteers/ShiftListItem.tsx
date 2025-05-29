import { Shift } from "../../state/apis/volunteerApi/types";
import { utcToZonedTime, format } from "date-fns-tz";
import { addHours } from "date-fns";
import { Link } from "react-router-dom";

const ShiftListItem = ({
  shift,
  bookedHoursId,
  contactId,
  driver,
}: {
  shift: Shift;
  bookedHoursId?: string;
  contactId: string;
  driver: boolean;
}) => {
  let linkUrl = "";
  if (bookedHoursId) {
    linkUrl = `../../confirm/${contactId}/${bookedHoursId}`;
  } else if (shift.open) {
    linkUrl = shift.id;
  }

  const formattedStartDate = format(
    utcToZonedTime(shift.startTime, "America/Los_Angeles"),
    "eee, M/d/yy"
  );
  const formattedStartTime = format(
    utcToZonedTime(shift.startTime, "America/Los_Angeles"),
    "h:mm aaa"
  );
  const endTime = addHours(
    utcToZonedTime(shift.startTime, "America/Los_Angeles"),
    shift.duration
  );
  const formattedEndTime = format(endTime, "h:mm aaa");

  const full = shift.open || bookedHoursId ? "" : "volunteers-unavailable";

  return (
    <Link key={shift.id} to={linkUrl}>
      <div className={`volunteers-shift ${full}`}>
        <div className="volunteers-shift-date">
          <span>&bull; </span>
          <div>
            {formattedStartDate}
            <div className="volunteers-shift-date-time">
              {driver
                ? `Delivery window: ${formattedStartTime} - ${formattedEndTime}`
                : formattedStartTime}
            </div>
          </div>
        </div>

        {shift.slots !== null && (
          <>
            <div className="volunteers-shift-space"></div>
            {driver ? (
              <ul>
                <li>Car size required: {shift.carSizeRequired}</li>
                <li>Distance: {shift.distance}</li>
              </ul>
            ) : (
              <div>{shift.slots} volunteers needed</div>
            )}
          </>
        )}
        {bookedHoursId && (
          <div className="volunteers-shift-checkmark">&#x2713; Signed Up</div>
        )}
      </div>
    </Link>
  );
};

export default ShiftListItem;
