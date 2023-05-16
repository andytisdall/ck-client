import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../../reusable/Loading';

const JobList = ({ jobs, shifts }) => {
  if (!jobs || !shifts) {
    return <Loading />;
  }

  return (
    <div>
      {jobs.map((j) => {
        const shift = shifts.find((sh) => sh.job === j.id);
        const color = shift.open ? '' : 'purple';
        return (
          <Link key={shift.id} to={shift.id}>
            <div className={`event-job ${color}`}>{j.name}</div>
          </Link>
        );
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
