import { useState } from "react";
import { utcToZonedTime, format } from "date-fns-tz";
import { useNavigate } from "react-router-dom";

import { useGetShiftsQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import { Job } from "../../../state/apis/volunteerApi/types";
import "./VolunteerJob.css";

const VolunteerJob = ({ job, open }: { job: Job; open?: boolean }) => {
  const [expand, setExpand] = useState(open);

  const { data } = useGetShiftsQuery();
  const shifts = data?.shifts;

  const navigate = useNavigate();

  const renderShifts = () => {
    if (shifts) {
      const jobShifts = Object.values(shifts).filter((sh) => sh.job === job.id);

      return jobShifts
        .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
        .map((shift) => {
          const active = shift.open;
          const inactiveStyle = active ? "job-active" : "job-full";
          return (
            <div
              className={`job-listing ${inactiveStyle}`}
              key={shift.id}
              onClick={() => {
                if (active) {
                  navigate(`../shift/${shift.id}`);
                }
              }}
            >
              <div className={`job-date ${active ? "" : "job-date-full"}`}>
                {format(
                  utcToZonedTime(shift.startTime, "America/Los_Angeles"),
                  "M/d/yy",
                )}
              </div>
              <div className={`job-time ${active ? "" : "job-date-full"}`}>
                {format(
                  utcToZonedTime(shift.startTime, "America/Los_Angeles"),
                  "eeee",
                )}
              </div>
              {!active && <div className="job-time">Full</div>}
            </div>
          );
        });
    }
  };

  const expanded = expand ? "expanded" : "";
  const inactive = job.active ? "" : "job-name-inactive";
  return (
    <div className="job-container">
      <div
        onClick={() => {
          if (job.active) {
            setExpand(!expand);
          }
        }}
      >
        <div className={`job-name ${inactive}`}>
          {job.active && <div className={`expand-btn ${expanded}`}>&rarr;</div>}
          <div>{job.name}</div>
          {job.active ? (
            <div className="job-location">{job.location}</div>
          ) : (
            <div className="job-disabled">Out of Service</div>
          )}
        </div>
      </div>
      <div className={`shift-list ${expanded ? "" : "closed"}`}>
        {expand && job.notes && (
          <div className="job-notes">
            <p>{job.notes}</p>
          </div>
        )}
        {expand && renderShifts()}
      </div>
    </div>
  );
};

export default VolunteerJob;
