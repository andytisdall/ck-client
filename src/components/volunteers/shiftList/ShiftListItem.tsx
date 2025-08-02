import config from "../config";
import {
  Shift,
  VolunteerCampaign,
} from "../../../state/apis/volunteerApi/types";
import DriverShiftListItemInfo from "./DriverShiftListItemInfo";
import ShiftListItemInfo from "./ShiftListItemInfo";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import { isCarBigEnough } from "../formatDateTime";

const ShiftListItem = ({
  shift,
  bookedHoursId,
  contactId,
  campaign,
}: {
  shift: Shift;
  bookedHoursId?: string;
  contactId: string;
  campaign: VolunteerCampaign;
}) => {
  const { data: driver } = useGetDriverQuery();
  let linkUrl = "";
  if (bookedHoursId) {
    linkUrl = `../../confirm/${contactId}/${bookedHoursId}`;
  } else if (shift.open) {
    linkUrl = "../" + shift.id;
  }

  const driverCampaign = campaign.id === config.deliveryDrivers.id;

  let isAvailable = shift.open || bookedHoursId ? true : false;

  if (driverCampaign) {
    const carIsBigEnough = isCarBigEnough({
      requirement: shift.carSizeRequired,
      userCar: driver?.car.size,
    });
    const disabled = !bookedHoursId && !carIsBigEnough;

    isAvailable = isAvailable && !disabled;
  }

  const Component = driverCampaign
    ? DriverShiftListItemInfo
    : ShiftListItemInfo;

  return (
    <Component shift={shift} isAvailable={isAvailable} linkUrl={linkUrl}>
      {bookedHoursId && (
        <div className="volunteers-shift-checkmark">&#x2713; Signed Up</div>
      )}
    </Component>
  );
};

export default ShiftListItem;
