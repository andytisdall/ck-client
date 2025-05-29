import { format, utcToZonedTime } from "date-fns-tz";
import { addHours } from "date-fns";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import {
  Job,
  Shift,
  VolunteerCampaign,
} from "../../state/apis/volunteerApi/types";
import ShiftInfoField from "./ShiftInfoField";
import config from "./ckKitchen/driver/config";

const ShiftInfo = ({
  job,
  shift,
  campaign,
}: {
  job: Job;
  shift: Shift;
  campaign: VolunteerCampaign;
}) => {
  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const driver = campaign.name === config.driverCampaignName;

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

  const formatDate = (date: string) =>
    format(utcToZonedTime(date, "America/Los_Angeles"), "eeee, M/d/yy");

  const formatTime = (date: string) =>
    format(utcToZonedTime(date, "America/Los_Angeles"), "h:mm a");

  if (driver) {
    const endTime = addHours(
      utcToZonedTime(shift.startTime, "America/Los_Angeles"),
      shift.duration
    );
    return (
      <div className="volunteers-shift-detail">
        <ShiftInfoField label="Job" value={job.name} />
        <ShiftInfoField
          label="Car Size Required"
          value={shift.carSizeRequired}
        />
        <ShiftInfoField
          label="Pick Up"
          value={job.location}
          notes={job.notes}
        />
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
              - ${format(endTime, "h:mm a")}`}
        />
        {renderVolunteer()}
      </div>
    );
  }

  return (
    <div className="volunteers-shift-detail">
      <ShiftInfoField label="Job" value={job.name} />
      <ShiftInfoField label="Description" value={job.description} />
      <ShiftInfoField label="Location" value={job.location} />
      <ShiftInfoField label="Date" value={formatDate(shift.startTime)} />
      <ShiftInfoField label="Time" value={formatTime(shift.startTime)} />
      <ShiftInfoField label="Duration" value={`${shift.duration} Hours`} />
      {renderVolunteer()}
    </div>
  );
};

export default ShiftInfo;
