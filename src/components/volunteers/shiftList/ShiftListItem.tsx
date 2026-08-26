import { useSelector } from "react-redux";

import config from "../config";
import {
  DriverJob,
  Job,
  VolunteerShift,
} from "@community-kitchens/apiinterfaces";
import ShiftListItemInfo from "./ShiftListItemInfo";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import { isCarBigEnough } from "../formatDateTime";
import {
  useGetUserInfoQuery,
  useGetUserQuery,
} from "../../../state/apis/authApi";
import { RootState } from "../../../state/store";

const ShiftListItem = ({
  shift,
  bookedHoursId,
  job,
}: {
  shift: VolunteerShift;
  bookedHoursId?: string;
  job: Job | DriverJob;
}) => {
  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer,
  );
  const { data: user } = useGetUserQuery();
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: driver } = useGetDriverQuery();

  const calfreshVolunteer =
    volunteer?.calfreshVolunteer || userInfo?.calfreshVolunteer;
  const contactId = volunteer?.id || user?.salesforceId;

  const reservedAvailable = calfreshVolunteer && shift.reservedOpen;
  let isAvailable =
    shift.open || reservedAvailable || bookedHoursId ? true : false;

  let linkUrl = "";
  if (bookedHoursId) {
    linkUrl = `../../../confirm/${contactId}/${bookedHoursId}`;
  } else if (isAvailable) {
    linkUrl = "../" + shift.id;
  }

  const driverCampaign = job.campaign === config.deliveryDrivers.id;

  if (driverCampaign) {
    const carIsBigEnough = isCarBigEnough({
      requirement: (job as DriverJob).carSizeRequired,
      userCar: driver?.car.size,
    });
    const disabled = !bookedHoursId && !carIsBigEnough;

    isAvailable = isAvailable && !disabled;
  }

  return (
    <ShiftListItemInfo
      shift={shift}
      isAvailable={isAvailable}
      linkUrl={linkUrl}
      driver={driverCampaign}
    >
      {bookedHoursId && (
        <div className="volunteers-shift-checkmark">&#x2713; Signed Up</div>
      )}
    </ShiftListItemInfo>
  );
};

export default ShiftListItem;
