import { addHours, formatISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { formatDate, formatTime } from "../formatDateTime";

import { Job, Shift } from "../../../state/apis/volunteerApi/types";
import ShiftInfoField from "./ShiftInfoField";

const DriverShiftInfo = ({ shift, job }: { shift: Shift; job: Job }) => {
  const endTime = formatISO(
    addHours(
      utcToZonedTime(shift.startTime, "America/Los_Angeles"),
      shift.duration
    )
  );

  return (
    <div className="volunteers-shift-detail">
      <ShiftInfoField label="Job" value={job.name} />
      <ShiftInfoField label="Car Size Required" value={shift.carSizeRequired} />
      <ShiftInfoField label="Pick Up" value={job.location} notes={job.notes} />
      <ShiftInfoField
        label="Drop Off"
        value={shift.destination}
        notes={shift.dropoffNotes}
      />
      <ShiftInfoField label="Distance" value={shift.distance} />
      <ShiftInfoField label="Date" value={formatDate(shift.startTime)} />
      <ShiftInfoField
        label="Time"
        value={`${formatTime(shift.startTime)}
            - ${formatTime(endTime)}`}
      />
    </div>
  );
};

export default DriverShiftInfo;
