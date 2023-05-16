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
        const shift = shifts[j.shifts[0]];

        if (shift.open) {
          return (
            <Link key={shift.id} to={shift.id}>
              <li className="event-job">
                {j.name}
                <p>{j.description}</p>
              </li>
            </Link>
          );
        } else {
          return (
            <li key={shift.id} className="event-job full">
              {j.name}
              <p>{j.description}</p>
            </li>
          );
        }
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
