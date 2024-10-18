import { format, utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';

import { Job, Shift, VolunteerHours } from '../../state/apis/volunteerApi';

const JobList = ({
  jobs,
  shifts,
  hours,
  campaignId,
  contactId,
}: {
  jobs: Job[];
  shifts: Shift[];
  hours: VolunteerHours[];
  campaignId: string;
  contactId?: string;
}) => {
  const bookedJobs = hours
    ? hours.filter((h) => h.status === 'Confirmed').map((h) => h.shift)
    : [];

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
                    linkUrl = `../signup-confirm/${campaignId}/${bookedHours.id}/${contactId}`;
                  }
                } else if (shift.open) {
                  linkUrl =
                    campaignId === 'ck-kitchen' ? `../${shift.id}` : shift.id;
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

                      {shift.slots !== null && (
                        <>
                          <div className="volunteers-shift-space">-</div>
                          <div>{shift.slots} volunteers needed</div>
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
      })}
    </div>
  );
};

export default JobList;
