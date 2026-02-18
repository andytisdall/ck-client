import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { VolunteerCampaign } from "../../../state/apis/volunteerApi/types";
import { useSignUpForVolunteerShiftMutation } from "../../../state/apis/volunteerApi/volunteerApi";
import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import ShiftInfo from "../shiftInfo/ShiftInfo";
import Loading from "../../reusable/loading/Loading";
import { setAlert } from "../../../state/apis/slices/alertSlice";

const Signup = ({
  shiftId,
  campaign,
  contactId,
  afterSubmit,
}: {
  shiftId: string;
  campaign: VolunteerCampaign;
  contactId: string;
  afterSubmit: (hoursId: string) => void;
}) => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });
  const [signUpForVolunteerShift, { isLoading: submitLoading }] =
    useSignUpForVolunteerShiftMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shifts = jobs?.map((j) => j.shifts).flat();
  const shift = shiftId ? shifts?.find((sh) => sh.id === shiftId) : undefined;
  const job = shift ? jobs?.find((j) => j.id === shift.job) : undefined;

  const onSubmit = async () => {
    if (shift && job) {
      const hour = await signUpForVolunteerShift({
        shiftId: shift.id,
        jobId: job.id,
        date: shift.startTime,
        contactSalesforceId: contactId,
      }).unwrap();

      dispatch(setAlert("You have successfully signed up for a shift!"));
      afterSubmit(hour.id);
    }
  };

  const renderBtns = () => {
    return (
      <div className="volunteers-signup-btns">
        <button onClick={onSubmit}>Confirm Signup</button>
        <button onClick={() => navigate("..")} className="cancel">
          Back
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!shift) {
    return <p>Could not find the requested info.</p>;
  }

  if (!shift.open) {
    return <p>This shift is not available for signup</p>;
  }

  if (!job || !campaign) {
    return <p>Could not find the info for this job.</p>;
  }

  return (
    <div>
      <h3 className="volunteers-signup-btns">Confirm your signup:</h3>
      <ShiftInfo shift={shift} job={job} />
      {submitLoading ? <Loading /> : renderBtns()}
    </div>
  );
};

export default Signup;
