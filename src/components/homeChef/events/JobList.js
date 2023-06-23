import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { useMemo } from 'react';

import Loading from '../../reusable/Loading';

const JobList = ({ jobs, shifts }) => {
  const { id } = useParams();

  const jobList = useMemo(
    () => jobs?.filter((j) => j.campaign === id),
    [id, jobs]
  );

  if (!jobs || !shifts) {
    return <Loading />;
  }

  return (
    <div>
      {jobList.map((j) => {
        return j.shifts.map((id) => {
          const shift = shifts[id];
          if (shift.open) {
            return (
              <Link key={shift.id} to={shift.id}>
                <li className="event-job">
                  {j.name} - {moment(shift.startTime).format('h:mm a')}
                  {/* <p>{j.description}</p> */}
                </li>
              </Link>
            );
          } else {
            return (
              <li key={shift.id} className="event-job full">
                {j.name} - {moment(shift.startTime).format('h:mm a')}
                {/* <p>{j.description}</p> */}
              </li>
            );
          }
        });
      })}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    shifts: state.event.shifts,
    jobs: state.event.jobs,
  };
};

export default connect(mapStateToProps)(JobList);
