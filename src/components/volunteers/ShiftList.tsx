import { format, utcToZonedTime } from "date-fns-tz";
import { addHours } from "date-fns";
import { Link } from "react-router-dom";
import { useMemo } from "react";

import {
  Job,
  Shift,
  VolunteerHours,
} from "../../state/apis/volunteerApi/types";
import { useGetHoursQuery } from "../../state/apis/volunteerApi/volunteerApi";

const ShiftList = ({
  contactId,
  job,
  campaignId,
  driver,
}: {
  contactId: string;
  job: Job;
  campaignId: string;
  driver?: boolean;
}) => {
  const { data: hours } = useGetHoursQuery({
    campaignId,
    contactId,
  });

  const { shifts } = job;

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

  const bookedJobs = !hours
    ? []
    : hours.filter((h) => h.status === "Confirmed").map((h) => h.shift);

  if (!sortedShifts?.length) {
    return <></>;
  }

  return (
    <div className="volunteers-job">
      <h3>{job.name}</h3>
      <p>{job.description}</p>
      {sortedShifts
        .filter((sh) => sh.job === job.id)
        .map((shift) => {
          const jobBooked = bookedJobs.includes(shift.id);
          let bookedHours: VolunteerHours | undefined;

          if (jobBooked && hours) {
            bookedHours = hours.find(
              (h) => h.shift === shift.id && h.status === "Confirmed"
            );
          }
          let linkUrl = "";
          if (jobBooked) {
            if (bookedHours) {
              linkUrl = `../../confirm/${contactId}/${bookedHours.id}`;
            }
          } else if (shift.open) {
            linkUrl = shift.id;
          }

          const formattedStartTime = format(
            utcToZonedTime(shift.startTime, "America/Los_Angeles"),
            "eee, M/d/yy h:mm a"
          );
          const endTime = addHours(
            utcToZonedTime(shift.startTime, "America/Los_Angeles"),
            shift.duration
          );

          const full = shift.open || jobBooked ? "" : "volunteers-unavailable";

          return (
            <Link key={shift.id} to={linkUrl}>
              <div className={`volunteers-shift ${full}`}>
                <div className="volunteers-shift-date">
                  <span>&bull; </span>
                  <span>
                    {formattedStartTime}
                    {driver ? ` - ${format(endTime, "h:mm a")}` : ""}
                  </span>
                </div>

                {shift.slots !== null && (
                  <>
                    <div className="volunteers-shift-space"></div>
                    {driver ? (
                      <ul>
                        <li>Car size required: {shift.carSizeRequired}</li>
                        <li>Distance: {job.distance}</li>
                      </ul>
                    ) : (
                      <div>{shift.slots} volunteers needed</div>
                    )}
                  </>
                )}
                {jobBooked && (
                  <div className="volunteers-shift-checkmark">
                    &#x2713; Signed Up
                  </div>
                )}
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ShiftList;
