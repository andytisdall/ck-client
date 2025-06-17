import { useSelector } from "react-redux";

import { RootState } from "../../../state/store";
import {
  Job,
  Shift,
  VolunteerCampaign,
} from "../../../state/apis/volunteerApi/types";
import ShiftInfoField from "./ShiftInfoField";
import config from "../driver/config";
import { formatDate, formatTime } from "../formatDateTime";
import DriverShiftInfo from "./DriverInfo";
import "./ShiftInfo.css";

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

  const driver = campaign.id === config.driverCampaignId;

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
    return <DriverShiftInfo shift={shift} job={job} />;
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
