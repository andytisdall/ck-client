import { format, utcToZonedTime } from "date-fns-tz";
import { useMemo } from "react";

import CalendarShift from "./CalendarShift";
import Calendar from "../../reusable/calendar/Calendar";
import Loading from "../../reusable/loading/Loading";
import {
  Shift,
  VolunteerHours,
  VolunteerCampaign,
} from "../../../state/apis/volunteerApi/types";
import { useGetHoursQuery } from "../../../state/apis/volunteerApi/volunteerApi";
import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import config from "../driver/config";
import DriverCalendarShift from "./DriverCalendarShift";

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
          return job?.active;
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
      return shiftsByDate[date].map((sh, index) => {
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
          <Component
            shift={sh}
            job={job}
            linkUrl={getLinkUrl()}
            key={sh.id}
            index={index}
          >
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

export default KitchenCalendar;
