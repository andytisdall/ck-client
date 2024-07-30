import { Link } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

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
  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: user } = useGetUserQuery();

  const getKitchenHoursQuery = useGetKitchenHoursQuery(
    volunteer?.id || user?.salesforceId
  );
  const hours = getKitchenHoursQuery.data;

  const bookedJobs = useMemo(() => {
    return hours
      ? Object.values(hours)
          .filter((h) => h.status === 'Confirmed')
          .map((h) => h.shift)
      : [];
  }, [hours]);

  const sortedShifts = useMemo(() => {
    if (shifts)
      return Object.values(shifts)
        .filter(
          (shift) =>
            utcToZonedTime(shift.startTime, 'America/Los_Angeles') > new Date()
        )
        .sort((a, b) =>
          new Date(a.startTime) > new Date(b.startTime) ? 1 : -1
        );
  }, [shifts]);

  const renderJobs = () => {
    if (sortedShifts) {
      return jobs
        ?.filter((job) => sortedShifts.find((shift) => shift.job === job.id))
        .sort((a, b) =>
          a.name === 'Meal Prep' ? 1 : b.name === 'Meal Prep' ? -1 : 0
        )
        .map((job) => {
          return (
            <div className="volunteers-job">
              <h3 className="volunteers-job-header">{job.name}</h3>
              <p>{job.description}</p>
              <h5>Available Times:</h5>
              <div>
                {sortedShifts
                  .filter((shift) => shift.job === job.id)
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
                        (h) => h.shift === shift.id && h.status === 'Confirmed'
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
                    } else if (shift.open) {
                      linkUrl = `../shift/${shift.id}`;
                    }

                    const unavailable = !shift.open
                      ? 'volunteers-unavailable'
                      : '';

                    return (
                      <Link key={shift.id} to={linkUrl}>
                        <div className={`volunteers-shift ${unavailable}`}>
                          <div className="volunteers-shift-date">
                            &bull; {dateDisplay}
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
    <>
      {isLoading && <Loading />}
      {renderJobs()}
    </>
  );
};

export default KitchenList;
