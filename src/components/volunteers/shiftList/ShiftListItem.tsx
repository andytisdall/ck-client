import config from "../driver/config";
import {
  Shift,
  VolunteerCampaign,
} from "../../../state/apis/volunteerApi/types";
import DriverShiftListItemInfo from "./DriverShiftListItemInfo";
import ShiftListItemInfo from "./ShiftListItemInfo";

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
  let linkUrl = "";
  if (bookedHoursId) {
    linkUrl = `../../confirm/${contactId}/${bookedHoursId}`;
  } else if (shift.open) {
    linkUrl = shift.id;
  }

  const full = shift.open || bookedHoursId ? "" : "volunteers-unavailable";

  const driver = campaign.id === config.driverCampaignId;

  const Component = driver ? DriverShiftListItemInfo : ShiftListItemInfo;

  return (
    <Component shift={shift} isAvailable={!full} linkUrl={linkUrl}>
      {bookedHoursId && (
        <div className="volunteers-shift-checkmark">&#x2713; Signed Up</div>
      )}
    </Component>
  );
};

export default ShiftListItem;
