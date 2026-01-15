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
      <ShiftInfoField label="Description" value={job.description} />
      <ShiftInfoField
        label="Minimum Vehicle Size Required"
        value={job.carSizeRequired}
      />
      <ShiftInfoField
        label="Pick Up Location"
        value={`${job.location}, ${job.locationCity}`}
        notes={job.locationInfo}
      />
      <ShiftInfoField
        label="Drop Off Location"
        value={job.destination}
        notes={job.dropoffNotes}
      />
      <ShiftInfoField label="Distance" value={job.distance} />
      <ShiftInfoField label="Date" value={formatDate(shift.startTime)} />
      <ShiftInfoField
        label="Pickup Window"
        value={`${formatTime(shift.startTime)}
            - ${formatTime(endTime)}`}
      />
    </div>
  );
};

export default DriverShiftInfo;
