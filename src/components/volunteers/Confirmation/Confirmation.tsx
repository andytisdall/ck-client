import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { useCancelVolunteerShiftMutation } from "../../../state/apis/volunteerApi/volunteerApi";
import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import { setAlert } from "../../../state/apis/slices/alertSlice";
import ShiftInfo from "../shiftInfo/ShiftInfo";
import Loading from "../../reusable/loading/Loading";
import {
  VolunteerCampaign,
  VolunteerHours,
} from "../../../state/apis/volunteerApi/types";
import config from "../driver/config";
import AppInfo from "../driver/AppInfo";

const Confirmation = ({
  hour,
  campaign,
}: {
  hour: VolunteerHours;
  campaign: VolunteerCampaign;
}) => {
  const { contactId } = useParams();
  const [cancelShift, { isLoading: cancelIsLoading }] =
    useCancelVolunteerShiftMutation();

  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

  const job = jobs?.find((j) => j.id === hour?.job);
  const shift = job?.shifts?.find((sh) => sh.id === hour?.shift);

  const driver = campaign?.id === config.driverCampaignId;

  const dispatch = useDispatch();

  const onCancel = () => {
    if (hour) {
      cancelShift({ hoursId: hour.id, contactId })
        .unwrap()
        .then(() =>
          dispatch(setAlert("You have canceled your volunteer shift"))
        );
    }
  };

  const canceled = hour?.status === "Canceled";

  const renderMessage = () => {
    const confirmMessage = (
      <p className="success-text">
        You have successfully signed up for this shift:
      </p>
    );
    const cancelMessage = (
      <p className="cancel-text">You have canceled this shift:</p>
    );
    return canceled ? cancelMessage : confirmMessage;
  };

  const renderShiftDetails = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (shift && job) {
      return (
        <div className="volunteers-signup-confirm">
          {renderMessage()}
          <ShiftInfo job={job} shift={shift} campaign={campaign} />
          {driver && !canceled && <AppInfo />}
          <p>You have been sent an email with this information.</p>
        </div>
      );
    } else {
      return (
        <div className="hc-confirm-details">
          Could not find the details of this shift.
        </div>
      );
    }
  };

  const renderCancelButton = () => {
    if (cancelIsLoading) {
      return <Loading />;
    }
    if (!canceled) {
      return (
        <button onClick={onCancel} className="cancel">
          Cancel Your Booked Volunteer Time
        </button>
      );
    }
  };

  return (
    <div>
      <h1>Volunteer Sign Up Confirmation</h1>
      {renderShiftDetails()}
      <div className="volunteers-signup-btns">
        <Link to={"/volunteers/signup/" + campaign.id}>
          <button className="hc-confirm-button">Back</button>
        </Link>
        {hour && renderCancelButton()}
      </div>
    </div>
  );
};

export default Confirmation;
