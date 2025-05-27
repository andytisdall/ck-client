import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import Loading from "../reusable/loading/Loading";
import { useGetHoursQuery } from "../../state/apis/volunteerApi/volunteerApi";
import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import { useSignUpForVolunteerShiftMutation } from "../../state/apis/volunteerApi/volunteerApi";
import { useGetSigningConfigQuery } from "../../state/apis/signApi";
import { useGetUserQuery, useGetUserInfoQuery } from "../../state/apis/authApi";
import { useGetJobsQuery } from "../../state/apis/volunteerApi/jobs";
import ShiftInfo from "./ShiftInfo";

const ShiftSignup = ({ campaignIdProp }: { campaignIdProp?: string }) => {
  const navigate = useNavigate();
  const { shiftId, campaignId } = useParams();

  const [signUpForVolunteerShift, { isLoading }] =
    useSignUpForVolunteerShiftMutation();

  const { data: signingConfig } = useGetSigningConfigQuery();
  const { data: jobs } = useGetJobsQuery({
    campaignId: campaignId || campaignIdProp || "",
  });

  const shifts = jobs?.map((j) => j.shifts).flat();

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: campaigns } = useGetCampaignsQuery();
  const campaign = campaigns?.find((cam) => cam.id === campaignId);

  const driver = campaign?.name === "Drivers";

  const { data: user } = useGetUserQuery();
  const { data: userInfo } = useGetUserInfoQuery();

  let contactSalesforceId = "";
  if (user) {
    contactSalesforceId = user.salesforceId;
  }
  if (volunteer) {
    contactSalesforceId = volunteer.id;
  }

  const { data: hours } = useGetHoursQuery({
    campaignId: campaignId || campaignIdProp || "",
    contactId: contactSalesforceId,
  });

  const getConfirmUrl = useCallback(
    (hoursId: string) => {
      return `../../../confirm/${contactSalesforceId}/${hoursId}`;
    },
    [contactSalesforceId, campaignId]
  );

  const bookedJobs = useMemo(() => {
    return hours
      ? hours.filter((h) => h.status === "Confirmed").map((h) => h.shift)
      : [];
  }, [hours]);

  const shift = shiftId ? shifts?.find((sh) => sh.id === shiftId) : undefined;
  const job = shift ? jobs?.find((j) => j.id === shift.job) : undefined;

  useEffect(() => {
    if (hours && shiftId && bookedJobs.includes(shiftId)) {
      const hour = hours.find(
        (h) => h.shift === shiftId && h.status === "Confirmed"
      );
      if (hour) {
        navigate(getConfirmUrl(hour.id));
      }
    }
  }, [hours, shiftId, navigate, bookedJobs, campaignId, getConfirmUrl]);

  const onSubmit = () => {
    const waiverSigned =
      userInfo?.volunteerAgreement || volunteer?.volunteerAgreement;

    if (shift && shiftId && job) {
      signUpForVolunteerShift({
        shiftId,
        jobId: job.id,
        date: shift.startTime,
        contactSalesforceId,
      })
        .unwrap()
        .then((hour) => {
          if (!waiverSigned && !signingConfig?.limitReached) {
            navigate(`../../../sign/CKK/${contactSalesforceId}/${hour.id}`);
          } else {
            navigate(getConfirmUrl(hour.id));
          }
        });
    }
  };

  const renderBtns = () => {
    return (
      <div className="volunteers-signup-btns">
        <button onClick={onSubmit}>Confirm Signup</button>
        <button onClick={() => navigate("..")} className="cancel">
          Cancel
        </button>
      </div>
    );
  };

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  if (!job) {
    return <p>Could not find the info for this job.</p>;
  }

  return (
    <div>
      <h3 className="volunteers-signup-btns">Confirm your signup:</h3>
      <ShiftInfo shift={shift} job={job} driver={driver} />
      {isLoading ? <Loading /> : renderBtns()}
    </div>
  );
};

export default ShiftSignup;
