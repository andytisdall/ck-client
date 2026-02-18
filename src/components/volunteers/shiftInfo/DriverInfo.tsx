import { addHours, formatISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { formatDate, formatTime } from "../formatDateTime";

import { DriverJob, Shift } from "../../../state/apis/volunteerApi/types";
import ShiftInfoField from "./ShiftInfoField";
import DriverApp from "../driver/DriverApp";

const DriverShiftInfo = ({ shift, job }: { shift: Shift; job: DriverJob }) => {
  const endTime = formatISO(
    addHours(
      utcToZonedTime(shift.startTime, "America/Los_Angeles"),
      shift.duration,
    ),
  );

  const isTownFridgeJob = job.name.match(/town fridges/i);

  return (
    <div className="volunteers-shift-detail">
      <ShiftInfoField label="Job" value={job.name} />
      <ShiftInfoField label="Description" value={job.description} />
      <ShiftInfoField
        label="Minimum Vehicle Size Required"
        value={job.carSizeRequired}
      />
      <ShiftInfoField
        label="Estimated Distance"
        value={`${job.distance} miles`}
      />
      <ShiftInfoField
        label="Estimated Time Required"
        value={`${job.timeRequired} hours`}
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
      <ShiftInfoField label="Date" value={formatDate(shift.startTime)} />
      <ShiftInfoField
        label="Pickup Window"
        value={`${formatTime(shift.startTime)}
            - ${formatTime(endTime)}`}
      />
      {isTownFridgeJob && <DriverApp />}
    </div>
  );
};

export default DriverShiftInfo;
