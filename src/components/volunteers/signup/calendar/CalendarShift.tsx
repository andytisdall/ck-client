import { useNavigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { format } from "date-fns";

import { VolunteerShift, Job } from "@community-kitchens/apiinterfaces";

const CalendarShift = ({
  shift,
  job,
  linkUrl,
  index,
  children,
}: {
  shift: VolunteerShift;
  job: Job;
  index: number;
  linkUrl?: string;
} & PropsWithChildren) => {
  const navigate = useNavigate();

  const shiftDisabled = !linkUrl;

  return (
    <div
      key={shift.id}
      className={
        "calendar-item calendar-color-" +
        index +
        (shiftDisabled ? " calendar-shift-disabled" : "")
      }
      onClick={() => {
        if (!shiftDisabled) {
          navigate(linkUrl);
        }
      }}
    >
      <div>
        <strong>{job.name}</strong>
      </div>
      <div>{format(new Date(shift.startTime), "h:mm a")}</div>
      <div>
        {shift.totalSlots && shift.slots !== null ? (
          <>{shift.slots} Spots</>
        ) : (
          <></>
        )}
      </div>
      <div></div>
      {children}
    </div>
  );
};
export default CalendarShift;
