import { format, utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';

import {
  Job,
  Shift,
  VolunteerHours,
  useGetHoursQuery,
} from '../../state/apis/volunteerApi';

const ShiftList = ({
  sortedShifts,
  contactId,
  job,
  campaignId,
}: {
  sortedShifts: Shift[];
  contactId: string;
  job: Job;
  campaignId: string;
}) => {
  const { data: hours } = useGetHoursQuery({
    campaignId,
    contactId,
  });

  const bookedJobs = !hours
    ? []
    : hours.filter((h) => h.status === 'Confirmed').map((h) => h.shift);

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
              (h) => h.shift === shift.id && h.status === 'Confirmed'
            );
          }
          let linkUrl = '';
          if (jobBooked) {
            if (bookedHours) {
              linkUrl = `../signup-confirm/${campaignId}/${bookedHours.id}/${contactId}`;
            }
          } else if (shift.open) {
            linkUrl = shift.id;
          }

          const full = shift.open || jobBooked ? '' : 'volunteers-unavailable';

          return (
            <Link key={shift.id} to={linkUrl}>
              <div className={`volunteers-shift ${full}`}>
                <div>
                  <span>&bull; </span>
                  <span>
                    {format(
                      utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                      'eee, M/d/yy h:mm a'
                    )}
                  </span>
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
};

export default ShiftList;
