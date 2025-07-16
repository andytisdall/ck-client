import { useNavigate } from "react-router-dom";
import { PropsWithChildren } from "react";

import { Shift, Job } from "../../../state/apis/volunteerApi/types";

const CalendarShift = ({
  shift,
  job,
  linkUrl,
  index,
  children,
}: {
  shift: Shift;
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
      <div className="volunteers-calendar-size">{job.name}</div>
      <div className="volunteers-calendar-spots">{shift.slots} Spots Left</div>
      {children}
    </div>
  );
};
export default CalendarShift;
