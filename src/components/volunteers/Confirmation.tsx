import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import { useCancelVolunteerShiftMutation } from "../../state/apis/volunteerApi/volunteerApi";
import { useGetHourQuery } from "../../state/apis/volunteerApi/volunteerApi";
import { useGetJobsQuery } from "../../state/apis/volunteerApi/jobs";
import { setAlert } from "../../state/apis/slices/alertSlice";
import ShiftInfo from "./shiftInfo/ShiftInfo";
import Loading from "../reusable/loading/Loading";
import {
  VolunteerCampaign,
  VolunteerHours,
} from "../../state/apis/volunteerApi/types";

const ConfirmationBase = () => {
  const { hoursId } = useParams();

  const { data: campaigns, isLoading: campaignsIsLoading } =
    useGetCampaignsQuery();

  const { data: hour, isLoading: hourIsLoading } = useGetHourQuery(
    hoursId || ""
  );

  const isLoading = campaignsIsLoading || hourIsLoading;

  const campaignId = hour?.campaign;
  const campaign = campaignId
    ? campaigns?.find((cam) => cam.id.startsWith(campaignId))
    : undefined;

  if (isLoading) {
    return <Loading />;
  }

  if (!campaign || !hour) {
    return <div>Not Found.</div>;
  }

  return <Confirmation campaign={campaign} hour={hour} />;
};

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
      <p>You have successfully signed up for this shift:</p>
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
        <Link to="/volunteers">
          <button className="hc-confirm-button">Back</button>
        </Link>
        {hour && renderCancelButton()}
      </div>
    </div>
  );
};

export default ConfirmationBase;
