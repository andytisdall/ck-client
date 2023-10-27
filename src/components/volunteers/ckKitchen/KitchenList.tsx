import { Link } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useSelector } from 'react-redux';

import {
  useGetKitchenShiftsQuery,
  useGetKitchenHoursQuery,
  VolunteerHours,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';
import { RootState } from '../../../state/store';

const KitchenList = () => {
  const { data, isLoading } = useGetKitchenShiftsQuery();
  const jobs = data?.jobs;
  const shifts = data?.shifts;

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: user } = useGetUserQuery();

  const getKitchenHoursQuery = useGetKitchenHoursQuery(
    volunteer?.id || user?.salesforceId
  );
  const hours = getKitchenHoursQuery.data;

  const bookedJobs = hours
    ? Object.values(hours)
        .filter((h) => h.status !== 'Canceled')
        .map((h) => h.shift)
    : [];

  const renderJobs = () => {
    if (jobs && shifts) {
      return Object.values(jobs).map((job) => {
        return (
          <div key={job.id} className="volunteers-job">
            <h3 className="volunteers-job-header">{job.name}</h3>
            <p>{job.description}</p>
            <h5>Available Times:</h5>
            <div>
              {Object.values(shifts)
                .filter((sh) => sh.open && sh.job === job.id)
                .map((shift) => {
                  const dateDisplay = format(
                    utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                    'eee, M/d/yy'
                  );

                  const timeDisplay = format(
                    utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                    'h:mmaaa'
                  );

                  const jobBooked = bookedJobs?.includes(shift.id);
                  let bookedHours: VolunteerHours | undefined;

                  if (jobBooked && hours) {
                    bookedHours = Object.values(hours).find(
                      (h) => h.shift === shift.id
                    );
                  }

                  let linkUrl = '';

                  if (jobBooked) {
                    if (bookedHours) {
                      if (volunteer) {
                        linkUrl = `../../signup-confirm/${bookedHours.id}/${volunteer.id}`;
                      } else if (user) {
                        linkUrl = `../../signup-confirm/${bookedHours.id}`;
                      }
                    }
                  } else {
                    linkUrl = `../shift/${shift.id}`;
                  }

                  return (
                    <Link key={shift.id} to={linkUrl}>
                      <div className="volunteers-shift">
                        &bull;
                        <div className="volunteers-shift-date">
                          {dateDisplay}
                        </div>
                        <div>{timeDisplay}</div>
                        <div className="volunteers-shift-space">-</div>
                        <div>{shift.slots} volunteers needed</div>
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
          </div>
        );
      });
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {renderJobs()}
    </div>
  );
};

export default KitchenList;
