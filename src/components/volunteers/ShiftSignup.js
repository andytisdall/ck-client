import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../actions';
import Loading from '../reusable/Loading';

const ShiftSignup = ({ jobs, shifts }) => {
  const navigate = useNavigate();
  const { shiftId } = useParams();

  if (!shifts || !jobs) {
    return <Loading />;
  }

  const shift = shifts[shiftId];
  const job = jobs[shift.job];

  if (!shift.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div className="volunteer-signup">
      <h3 className="volunteers-signup-btns">Signing up for:</h3>
      <div className="volunteers-shift-detail">
        <p>
          <b>Job:</b> {job.name}
        </p>
        <p>
          <b>Description:</b> {job.description}
        </p>
        <p>
          <b>Location:</b> {job.location}
        </p>
        <p>
          <b>Date: </b>
          {moment(shift.startTime).format('dddd, M/D/YY')}
        </p>
        <p>
          <b>Time: </b>
          {moment(shift.startTime).format('h:mm a')}
        </p>
        <p>
          <b>Duration: </b>
          {shift.duration} Hours
        </p>
      </div>
      <div className="volunteers-signup-btns">
        <button onClick={() => navigate('../list')} className="cancel">
          Cancel
        </button>
        <button onClick={() => navigate('../get-volunteer/' + shiftId)}>
          Confirm Signup
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.volunteers.jobs,
    shifts: state.volunteers.shifts,
  };
};

export default connect(mapStateToProps, actions)(ShiftSignup);
