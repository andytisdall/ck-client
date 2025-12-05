import { useSelector } from "react-redux";
import { utcToZonedTime } from "date-fns-tz";
import { useState, useEffect } from "react";

import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import { RootState } from "../../../state/store";
import { useGetUserQuery } from "../../../state/apis/authApi";
import Loading from "../../reusable/loading/Loading";
import ShiftList from "../shiftList/ShiftList";
import { VolunteerCampaign } from "../../../state/apis/volunteerApi/types";
import config from "../config";
import GetVolunteer from "../getVolunteer/GetVolunteer";

const JobList = ({ campaign }: { campaign: VolunteerCampaign }) => {
  const [getContact, setGetContact] = useState(false);
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: campaign.id,
  });

  const driver = campaign.id === config.deliveryDrivers.id;

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: user } = useGetUserQuery();

  const contactId = volunteer?.id || user?.salesforceId;

  useEffect(() => {
    if (contactId) {
      setGetContact(false);
    }
  }, [contactId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!jobs) {
    return <div>Could not find info.</div>;
  }

  const visibleJobs = jobs.filter((j) => {
    const filteredShifts = j.shifts.filter(
      (shift) =>
        utcToZonedTime(shift.startTime, "America/Los_Angeles") > new Date() &&
        (!driver ? true : shift.carSizeRequired)
    );

    return j.active && filteredShifts.length;
  });

  const renderSignIn = () => {
    if (!user && !volunteer) {
      return (
        <button
          onClick={() => setGetContact(true)}
          className="volunteers-shift-space"
        >
          Click here to see shifts you signed up for
        </button>
      );
    }
  };

  if (!visibleJobs.length) {
    return <div>No upcoming shifts are available for sign up.</div>;
  }

  if (getContact) {
    return <GetVolunteer />;
  }

  return (
    <div>
      <div className="volunteers-email-display">
        <h3>Positions Available</h3>
        {renderSignIn()}
      </div>
      {visibleJobs.map((j) => {
        return (
          <ShiftList
            campaign={campaign}
            job={j}
            key={j.id}
            contactId={contactId}
          />
        );
      })}
      {driver && (
        <div className="volunteers-job">
          <h3>More driver opportunities coming soon</h3>
        </div>
      )}
    </div>
  );
};

export default JobList;
