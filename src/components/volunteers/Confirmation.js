import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import * as actions from '../../actions';
import Loading from '../reusable/loading/Loading';

const Confirmation = ({ hours, jobs }) => {
  const { hoursId } = useParams();
  const hour = hours && hoursId ? hours[hoursId] : null;

  const renderShiftDetails = () => {
    const job = jobs[hour.job];
    if (hour && job) {
      return (
        <div className="hc-confirm-details">
          <p>You have successfully signed up for this shift:</p>
          <ul>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Date:</span>{' '}
              {moment(hour.time).format('dddd, M/D/yy')}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Fridge:</span> {job.name}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Location:</span> {job.location}
            </li>
          </ul>
          <p>You have been sent an email with this information.</p>
        </div>
      );
    } else {
      return (
        <div className="hc-confirm-details">
          Could not find the details of this shift.
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Home Chef Sign Up Confirmation</h1>
      {!jobs || !hours ? <Loading /> : renderShiftDetails()}
      <Link to="/volunteers">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    hours: state.volunteers.hours,
    jobs: state.volunteers.jobs,
  };
};

export default connect(mapStateToProps, actions)(Confirmation);
