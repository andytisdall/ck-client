import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';

import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';
import * as actions from '../../actions';
import '../homeChef/events/VolunteerEvent.css';

const KitchenHome = ({ shifts, jobs, getKitchenShifts }) => {
  const [loading, setLoading] = useLoading();

  useEffect(() => {
    if (!jobs) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  });

  const renderJobs = () => {
    return Object.values(jobs).map((job) => {
      return (
        <div key={job.id}>
          <h3>{job.name}</h3>
          <p>{job.description}</p>
          {Object.values(shifts)
            .filter((sh) => sh.job === job.id)
            .map((shift) => {
              const timeDisplay = format(
                utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                'M/d/yy h:mm a'
              );
              if (shift.open) {
                return (
                  <Link key={shift.id} to={shift.id}>
                    <li className="event-job" key={shift.id}>
                      {timeDisplay}
                    </li>
                  </Link>
                );
              } else {
                return (
                  <li key={shift.id} className="event-job full">
                    {timeDisplay}
                  </li>
                );
              }
            })}
        </div>
      );
    });
  };

  return (
    <div>
      {loading && <Loading />}
      {!!jobs && renderJobs()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { shifts: state.volunteers.shifts, jobs: state.volunteers.jobs };
};

export default connect(mapStateToProps, actions)(KitchenHome);
