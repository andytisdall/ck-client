import { format, utcToZonedTime } from "date-fns-tz";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../state/store";
import Calendar from "../../reusable/calendar/Calendar";
import Loading from "../../reusable/loading/Loading";
import {
  useGetCampaignsQuery,
  useGetHoursQuery,
  Shift,
  VolunteerHours,
  VolunteerCampaign,
} from "../../../state/apis/volunteerApi";
import { useGetUserQuery } from "../../../state/apis/authApi";

const KitchenCalBase = () => {
  const { campaignId } = useParams();

  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const campaign = campaigns?.find((cam) => cam.id === campaignId);

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: user } = useGetUserQuery();
  const contactId = volunteer?.id || user?.salesforceId;
  if (isLoading) {
    return <Loading />;
  }

  if (!(contactId && campaign)) {
    return <div>Volunteer campaign data not found</div>;
  }

  return <KitchenCalendar contactId={contactId} campaign={campaign} />;
};

const KitchenCalendar = ({
  contactId,
  campaign,
}: {
  contactId: string;
  campaign: VolunteerCampaign;
}) => {
  const navigate = useNavigate();

  const { shifts, jobs } = campaign;

  const { data: hours, isLoading } = useGetHoursQuery({
    contactId,
    campaignId: campaign.id,
  });

  const driver = campaign.name === "Drivers";

  const bookedJobs = hours
    ? Object.values(hours)
        .filter((h) => h.status === "Confirmed")
        .map((h) => h.shift)
    : [];

  const shiftsByDate = useMemo(() => {
    const sortedShifts: Record<string, Shift[]> = {};
    if (shifts) {
      Object.values(shifts)
        .filter((shift) => {
          const job = jobs?.find((j) => j.id === shift.job);
          return job?.ongoing && job.active;
        })
        .forEach((shift) => {
          const formattedTime = format(
            utcToZonedTime(shift.startTime, "America/Los_Angeles"),
            "yyyy-MM-dd"
          );
          if (!sortedShifts[formattedTime]) {
            sortedShifts[formattedTime] = [shift];
          } else {
            sortedShifts[formattedTime].push(shift);
          }
        });
      return sortedShifts;
    }
  }, [shifts, jobs]);

  const renderShifts = (date: string) => {
    if (shiftsByDate && shiftsByDate[date]) {
      return shiftsByDate[date].map((sh) => {
        const job = jobs ? jobs.find((j) => j.id === sh.job) : undefined;
        const jobBooked = bookedJobs.includes(sh.id);
        let bookedHours: VolunteerHours | undefined;
        if (jobBooked && hours) {
          bookedHours = Object.values(hours).find(
            (h) => h.shift === sh.id && h.status === "Confirmed"
          );
        }
        const shiftStatus = !sh.open ? "calendar-shift-disabled" : "";

        return (
          <div
            key={sh.id}
            className={"calendar-item calendar-color-0 " + shiftStatus}
            onClick={() => {
              if (jobBooked) {
                if (bookedHours) {
                  navigate(
                    `../../signup-confirm/${campaign?.id}/${bookedHours.id}/${contactId}`
                  );
                }
              } else if (sh.open) {
                navigate(`../${sh.id}`);
              }
            }}
          >
            <div>{job?.name}</div>
            {driver ? (
              <div className="volunteers-calendar-spots">Driver Info</div>
            ) : (
              <div className="volunteers-calendar-spots">
                {sh.slots} Spots Left
              </div>
            )}
            {jobBooked && (
              <div className="volunteers-calendar-checkmark">
                &#x2713; Signed Up
              </div>
            )}
          </div>
        );
      });
    } else {
      return [];
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return <Calendar renderItems={renderShifts} />;
};

export default KitchenCalBase;
