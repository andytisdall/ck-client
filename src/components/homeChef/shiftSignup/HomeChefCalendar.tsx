import { useMemo, useCallback, JSX } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import { useNavigate } from "react-router-dom";

import Loading from "../../reusable/loading/Loading";
import Calendar from "../../reusable/calendar/Calendar";
import { Shift } from "../../../state/apis/volunteerApi/types";
import { useGetShiftsQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import { useGetUserQuery } from "../../../state/apis/authApi";

const HomeChefCalendar = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetShiftsQuery();
  const shifts = data?.shifts;
  const jobs = data?.jobs;
  const { data: user } = useGetUserQuery();

  const orderedShifts = useMemo(() => {
    const orderedByDate: Record<string, Shift[]> = {};

    if (!shifts || !jobs) {
      return orderedByDate;
    }
    Object.values(shifts)
      .filter((sh) => {
        const job = jobs.find((j) => j.id === sh.job);
        // lose the region filter if using blank as ck kitchen dropoffs
        return !user?.admin
          ? job?.ongoing && job.active && job.region
          : job?.ongoing && job.active;
      })
      .forEach((sh) => {
        const formattedTime = format(
          utcToZonedTime(sh.startTime, "America/Los_Angeles"),
          "yyyy-MM-dd"
        );
        if (orderedByDate[formattedTime]) {
          orderedByDate[formattedTime].push(sh);
        } else {
          orderedByDate[formattedTime] = [sh];
        }
      });
    return orderedByDate;
  }, [shifts, jobs, user]);

  const getShifts = useCallback(
    (d: string) => {
      let dayShifts: JSX.Element[] = [];

      if (orderedShifts[d] && jobs) {
        dayShifts = orderedShifts[d].map((sh) => {
          const jobIndex = jobs.findIndex((j) => j.id === sh.job);
          const job = jobs[jobIndex];
          const available = sh.open;
          const status = available ? "" : "calendar-shift-disabled";
          const link = () => navigate("../shift/" + sh.id);
          return (
            <div
              key={sh.id}
              className={`calendar-item calendar-color-${jobIndex} ${status}`}
              onClick={() => available && link()}
            >
              {job.name}
            </div>
          );
        });
      }
      return dayShifts;
    },
    [jobs, navigate, orderedShifts]
  );

  if (isLoading) {
    return <Loading />;
  }

  return <Calendar renderItems={getShifts} />;
};

export default HomeChefCalendar;
