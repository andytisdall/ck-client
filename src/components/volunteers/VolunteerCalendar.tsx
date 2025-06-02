import { format, utcToZonedTime } from "date-fns-tz";
import { useNavigate, useParams } from "react-router-dom";
import { PropsWithChildren, useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../state/store";
import Calendar from "../reusable/calendar/Calendar";
import Loading from "../reusable/loading/Loading";
import {
  Job,
  Shift,
  VolunteerHours,
  VolunteerCampaign,
} from "../../state/apis/volunteerApi/types";
import { useGetCampaignsQuery } from "../../state/apis/volunteerApi/campaigns";
import { useGetUserQuery } from "../../state/apis/authApi";
import { useGetHoursQuery } from "../../state/apis/volunteerApi/volunteerApi";
import { useGetJobsQuery } from "../../state/apis/volunteerApi/jobs";
import config from "./driver/config";
import { isCarBigEnough } from "./formatDateTime";
import { useGetDriverQuery } from "../../state/apis/volunteerApi/driver";

const KitchenCalBase = () => {
  const { campaignId } = useParams();

  const { data: campaigns, isLoading } = useGetCampaignsQuery();
  const campaign = campaigns?.find((cam) => cam.id === campaignId);

  const volunteer = useSelector(
    (state: RootState) => state.volunteer.volunteer
  );

  const { data: user, isLoading: userIsLoading } = useGetUserQuery();
  const contactId = volunteer?.id || user?.salesforceId;

  if (isLoading || userIsLoading) {
    return <Loading />;
  }

  if (!(contactId && campaign)) {
    return <div>Volunteer campaign data not found</div>;
  }

  return <KitchenCalendar contactId={contactId} campaign={campaign} />;
};

const CalendarShift = ({
  shift,
  job,
  linkUrl,
  children,
}: {
  shift: Shift;
  job: Job;
  linkUrl?: string;
} & PropsWithChildren) => {
  const navigate = useNavigate();

  const shiftStatus = !shift.open ? "calendar-shift-disabled" : "";
  return (
    <div
      key={shift.id}
      className={"calendar-item calendar-color-0 " + shiftStatus}
      onClick={() => {
        if (linkUrl) {
          navigate(linkUrl);
        }
      }}
    >
      <div>{job.name}</div>
      <div className="volunteers-calendar-spots">{shift.slots} Spots Left</div>
      {children}
    </div>
  );
};

const DriverCalendarShift = ({
  shift,
  linkUrl,
}: {
  shift: Shift;
  linkUrl?: string;
}) => {
  const { data: driver } = useGetDriverQuery();
  const navigate = useNavigate();

  const carIsBigEnough =
    driver &&
    isCarBigEnough({
      requirement: shift.carSizeRequired,
      userCar: driver?.car.size,
    });

  const shiftStatus =
    !shift.open || !carIsBigEnough ? "calendar-shift-disabled" : "";
  return (
    <div
      key={shift.id}
      className={"calendar-item calendar-color-0 " + shiftStatus}
      onClick={() => {
        if (linkUrl) {
          navigate(linkUrl);
        }
      }}
    >
      <div>{shift.carSizeRequired}</div>
      <div className="volunteers-calendar-spots">{shift.distance}</div>
    </div>
  );
};

const KitchenCalendar = ({
  contactId,
  campaign,
}: {
  contactId: string;
  campaign: VolunteerCampaign;
}) => {
  const { data: jobs } = useGetJobsQuery({
    campaignId: campaign.id,
  });

  const { data: hours, isLoading } = useGetHoursQuery({
    contactId,
    campaignId: campaign.id,
  });
  const shifts = jobs?.map((j) => j.shifts).flat();

  const driverCampaign = campaign.id === config.driverCampaignId;
  const Component = driverCampaign ? DriverCalendarShift : CalendarShift;

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
        const job = jobs?.find((j) => j.id === sh.job);
        if (!job) {
          return <div>Job not found.</div>;
        }
        const jobBooked = bookedJobs.includes(sh.id);
        let bookedHours: VolunteerHours | undefined;
        if (jobBooked && hours) {
          bookedHours = Object.values(hours).find(
            (h) => h.shift === sh.id && h.status === "Confirmed"
          );
        }

        const getLinkUrl = () => {
          if (jobBooked) {
            if (bookedHours) {
              return `../../../confirm/${contactId}/${bookedHours.id}`;
            }
          } else if (sh.open) {
            return `../${sh.id}`;
          }
        };

        return (
          <Component shift={sh} job={job} linkUrl={getLinkUrl()} key={sh.id}>
            {jobBooked && (
              <div className="volunteers-calendar-checkmark">
                &#x2713; Signed Up
              </div>
            )}
          </Component>
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
