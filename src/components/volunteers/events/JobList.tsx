import { Link, useParams } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import { useGetUserQuery } from '../../../state/apis/authApi';
import {
  useGetEventsQuery,
  Job,
  useGetEventHoursQuery,
  VolunteerHours,
} from '../../../state/apis/volunteerApi';
import Loading from '../../reusable/loading/Loading';

const JobList = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetEventsQuery();
  const events = data;

  const event = events && id ? events.find((cam) => cam.id === id) : undefined;
  const shifts = event?.shifts;
  const jobs = event?.jobs;

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: user } = useGetUserQuery();

  const { data: hours } = useGetEventHoursQuery({
    campaignId: id || '',
    contactId: volunteer?.id || user?.salesforceId || '',
  });

  const bookedJobs = hours
    ? hours.filter((h) => h.status === 'Confirmed').map((h) => h.shift)
    : [];

  if (isLoading) {
    return <Loading />;
  }

  if (jobs && shifts) {
    return (
      <div>
        <h3 className="volunteers-signup-btns">Positions Available</h3>

        {jobs.map((j: Job) => {
          return (
            <div className="volunteers-job" key={j.id}>
              <h3>{j.name}</h3>
              <p>{j.description}</p>
              {shifts
                .filter((sh) => sh && j.shifts.includes(sh.id))
                .map((shift) => {
                  const full = shift.open ? '' : 'volunteers-unavailable';

                  const jobBooked = bookedJobs?.includes(shift.id);
                  let bookedHours: VolunteerHours | undefined;

                  if (jobBooked && hours) {
                    bookedHours = hours.find(
                      (h) => h.shift === shift.id && h.status === 'Confirmed'
                    );
                  }
                  let linkUrl = '';
                  if (jobBooked) {
                    if (bookedHours) {
                      linkUrl = `../signup-confirm/${id}/${bookedHours.id}`;
                    }
                  } else if (shift.open) {
                    linkUrl = shift.id;
                  }
                  return (
                    <Link key={shift.id} to={linkUrl}>
                      <div className={`volunteers-shift ${full}`}>
                        <div>
                          &bull;{' '}
                          {format(
                            utcToZonedTime(
                              shift.startTime,
                              'America/Los_Angeles'
                            ),
                            'eee, M/d/yy h:mm a'
                          )}
                        </div>
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
          );
        })}
      </div>
    );
  }
  return (
    <div>
      Could not find information about this event. Please try again later.
    </div>
  );
};

export default JobList;
