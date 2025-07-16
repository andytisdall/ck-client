import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../state/store";
import Loading from "../../reusable/loading/Loading";
import { useGetHoursQuery } from "../../../state/apis/volunteerApi/volunteerApi";
import { useGetCampaignsQuery } from "../../../state/apis/volunteerApi/campaigns";
import { useGetSigningConfigQuery } from "../../../state/apis/signApi";
import {
  useGetUserQuery,
  useGetUserInfoQuery,
} from "../../../state/apis/authApi";
import Signup from "./Signup";

const SignupBase = () => {
  const navigate = useNavigate();
  const { shiftId, campaignId } = useParams();

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const campaign = campaigns?.find((cam) => cam.id === campaignId);

  const { data: user } = useGetUserQuery();

  const { data: signingConfig } = useGetSigningConfigQuery();
  const { data: userInfo } = useGetUserInfoQuery();
  const waiverSigned =
    userInfo?.volunteerAgreement || volunteer?.volunteerAgreement;

  let contactId = "";
  if (user) {
    contactId = user.salesforceId;
  }
  if (volunteer) {
    contactId = volunteer.id;
  }

  const { data: hours } = useGetHoursQuery({
    campaignId: campaign?.id || "",
    contactId,
  });

  const bookedJobs = useMemo(() => {
    return hours
      ? hours.filter((h) => h.status === "Confirmed").map((h) => h.shift)
      : [];
  }, [hours]);

  const destinationUrl = `../../../confirm/${contactId}/`;

  useEffect(() => {
    if (hours && shiftId && bookedJobs.includes(shiftId)) {
      const hour = hours.find(
        (h) => h.shift === shiftId && h.status === "Confirmed"
      );
      if (hour) {
        navigate(destinationUrl + hour.id);
      }
    }
  }, [bookedJobs, destinationUrl, hours, navigate, shiftId]);

  const afterSubmit = (hoursId: string) => {
    if (
      (userInfo || volunteer) &&
      signingConfig &&
      !waiverSigned &&
      !signingConfig.limitReached
    ) {
      navigate(`../../../sign/CKK/${contactId}/${hoursId}`);
    } else {
      navigate(destinationUrl + hoursId);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!campaign || !shiftId) {
    return <>Could not find the requested info.</>;
  }

  return (
    <Signup
      contactId={contactId}
      shiftId={shiftId}
      campaign={campaign}
      afterSubmit={afterSubmit}
    />
  );
};

export default SignupBase;
