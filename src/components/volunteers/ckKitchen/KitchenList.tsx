import { Link } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';

import { useGetKitchenShiftsQuery } from '../../../state/apis/volunteerApi';
import Loading from '../../reusable/loading/Loading';

const KitchenHome = () => {
  const { data, isLoading } = useGetKitchenShiftsQuery();
  const jobs = data?.jobs;
  const shifts = data?.shifts;

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

                  return (
                    <Link key={shift.id} to={`../${shift.id}`}>
                      <div className="volunteers-shift">
                        &bull;
                        <div className="volunteers-shift-date">
                          {dateDisplay}
                        </div>
                        <div>{timeDisplay}</div>
                        <div>-</div>
                        <div>{shift.slots} volunteers needed</div>
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

export default KitchenHome;
