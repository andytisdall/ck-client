import { utcToZonedTime } from "date-fns-tz";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import { RootState } from "../../state/store";
import { useGetUserQuery } from "../../state/apis/authApi";
import Loading from "../reusable/loading/Loading";
import { useGetCampaignsQuery } from "../../state/apis/volunteerApi";
import ShiftList from "./ShiftList";

const JobList = ({ campaignIdProp }: { campaignIdProp?: string }) => {
  const { campaignId } = useParams();

  const { data, isLoading } = useGetCampaignsQuery();
  const campaigns = data;

  const campaign =
    campaigns && campaignId
      ? campaigns.find((cam) =>
          campaignIdProp ? cam.id === campaignIdProp : cam.id === campaignId
        )
      : undefined;

  const shifts = campaign?.shifts;
  const jobs = campaign?.jobs;

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: user } = useGetUserQuery();

  const contactId = volunteer?.id || user?.salesforceId;

  const sortedShifts = useMemo(() => {
    if (shifts)
      return Object.values(shifts)
        .filter(
          (shift) =>
            utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date()
        )
        .sort((a, b) =>
          new Date(a.startTime) > new Date(b.startTime) ? 1 : -1
        );
  }, [shifts]);

  if (isLoading) {
    return <Loading />;
  }

  if (!sortedShifts || !jobs || !campaign || !contactId) {
    return <div>Could not find info.</div>;
  }

  return (
    <div>
      <h3 className="volunteers-signup-btns">Positions Available</h3>
      {jobs
        .filter((j) => sortedShifts.find((sh) => sh.job === j.id))
        .map((j) => {
          return (
            <ShiftList
              campaignId={campaign.id}
              job={j}
              sortedShifts={sortedShifts}
              key={j.id}
              contactId={contactId}
              driver={campaign.name === "Drivers"}
            />
          );
        })}
    </div>
  );
};

export default JobList;
