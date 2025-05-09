import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  useCancelVolunteerShiftMutation,
  useGetHourQuery,
  useGetCampaignsQuery,
} from "../../state/apis/volunteerApi";
import { setAlert } from "../../state/apis/slices/alertSlice";
import ShiftInfo from "./ShiftInfo";
import Loading from "../reusable/loading/Loading";

const Confirmation = () => {
  const { hoursId, contactId } = useParams();
  const { data: campaigns, isLoading: campaignsIsLoading } =
    useGetCampaignsQuery();
  const { data: hour, isLoading: hourIsLoading } = useGetHourQuery(
    hoursId || ""
  );
  const isLoading = campaignsIsLoading || hourIsLoading;

  const [cancelShift, { isLoading: cancelIsLoading }] =
    useCancelVolunteerShiftMutation();

  const campaignId = hour?.campaign;
  const campaign = campaignId
    ? campaigns?.find((cam) => cam.id.startsWith(campaignId))
    : undefined;

  const jobs = campaign?.jobs;
  const shifts = campaign?.shifts;
  const job = jobs?.find((j) => j.id === hour?.job);
  const shift = shifts?.find((sh) => sh.id === hour?.shift);

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
        <div>
          {renderMessage()}
          <ShiftInfo job={job} shift={shift} />
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
      <Link to="/volunteers">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
      {hour && renderCancelButton()}
    </div>
  );
};

export default Confirmation;
