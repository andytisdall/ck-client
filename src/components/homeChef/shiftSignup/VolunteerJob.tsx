import { useState } from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';

import { useGetShiftsQuery } from '../../../state/apis/volunteerApi/homeChefApi';
import { Job } from '../../../state/apis/volunteerApi/types';
import { Link } from 'react-router-dom';
import './VolunteerJob.css';

const VolunteerJob = ({ job }: { job: Job }) => {
  const [expand, setExpand] = useState(false);

  const { data } = useGetShiftsQuery();
  const shifts = data?.shifts;

  const renderShifts = () => {
    if (shifts) {
      const jobShifts = job.shifts.map((id) => shifts[id]);

      return jobShifts
        .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
        .map((shift) => {
          return (
            <div className="job-listing" key={shift.id}>
              {shift.open ? (
                <Link to={`../shift/${shift.id}`}>
                  <button>Sign Up</button>
                </Link>
              ) : (
                <div className="job-full">full</div>
              )}
              <div className={`job-date ${shift.open ? '' : 'job-date-full'}`}>
                {format(
                  utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                  'M/d/yy'
                )}
              </div>
              <div className={`job-time ${shift.open ? '' : 'job-date-full'}`}>
                {format(
                  utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                  'eeee'
                )}
                <span className="job-name-small"> - {job.name}</span>
              </div>
            </div>
          );
        });
    }
  };

  const expanded = expand ? 'expanded' : '';
  const inactive = job.active ? '' : 'job-name-inactive';
  return (
    <div
      className="job-container"
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
      {job.active && job.notes && (
        <div className="job-notes">
          <p>{job.notes}</p>
        </div>
      )}

      <div className={`shift-list ${expanded ? '' : 'closed'}`}>
        {expand && renderShifts()}
      </div>
    </div>
  );
};

export default VolunteerJob;
