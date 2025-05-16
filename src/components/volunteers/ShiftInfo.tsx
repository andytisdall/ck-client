import { format, utcToZonedTime } from "date-fns-tz";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import { Job, Shift } from "../../state/apis/volunteerApi";

const ShiftInfo = ({
  job,
  shift,
  driver,
}: {
  job: Job;
  shift: Shift;
  driver?: boolean;
}) => {
  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const renderVolunteer = () => {
    if (volunteer) {
      return (
        <div className="vol-info">
          <b>Your Info:</b>
          <ul>
            <li>
              <b>Name:</b> {volunteer.name}
            </li>
          </ul>
        </div>
      );
    }
  };

  if (driver) {
    // render driver info
  }

  return (
    <div>
      <div className="volunteers-shift-detail">
        <p>
          <b>Job:</b> {job?.name}
        </p>
        <p>
          <b>Description:</b> {job?.description}
        </p>
        <p>
          <b>Location:</b> {job?.location}
        </p>
        <p>
          <b>Date: </b>
          {format(
            utcToZonedTime(shift.startTime, "America/Los_Angeles"),
            "eeee, M/d/yy"
          )}
        </p>
        <p>
          <b>Time: </b>
          {format(
            utcToZonedTime(shift.startTime, "America/Los_Angeles"),
            "h:mm a"
          )}
        </p>
        <p>
          <b>Duration: </b>
          {shift.duration} Hours
        </p>
        {renderVolunteer()}
      </div>
    </div>
  );
};

export default ShiftInfo;
