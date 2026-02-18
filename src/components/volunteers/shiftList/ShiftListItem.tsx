import config from "../config";
import { DriverJob, Job, Shift } from "../../../state/apis/volunteerApi/types";
import ShiftListItemInfo from "./ShiftListItemInfo";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import { isCarBigEnough } from "../formatDateTime";

const ShiftListItem = ({
  shift,
  bookedHoursId,
  contactId,
  job,
}: {
  shift: Shift;
  bookedHoursId?: string;
  contactId?: string;
  job: Job | DriverJob;
}) => {
  const { data: driver } = useGetDriverQuery();
  let linkUrl = "";
  if (bookedHoursId) {
    linkUrl = `../../../confirm/${contactId}/${bookedHoursId}`;
  } else if (shift.open) {
    linkUrl = "../" + shift.id;
  }

  const driverCampaign = job.campaign === config.deliveryDrivers.id;

  let isAvailable = shift.open || bookedHoursId ? true : false;

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
