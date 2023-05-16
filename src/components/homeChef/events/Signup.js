import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../../actions';
import Loading from '../../reusable/Loading';
import useLoading from '../../../hooks/useLoading';

const EventShiftSignup = ({ jobs, shifts, signUpForEventShift }) => {
  const [loading, setLoading] = useLoading();

  const { shiftId } = useParams();

  if (!shifts || !jobs) {
    return <Loading />;
  }

  const shift = shifts[shiftId];
  const job = jobs.find((j) => j.id === shift.job);

  const onSubmit = () => {
    setLoading(true);
    signUpForEventShift(shiftId, job?.id, shift?.startTime);
  };

  if (!shift.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div className="shift-detail">
      <h2>Signing up for:</h2>
      <h2 className="signup-form-date">
        {moment(shift.startTime).format('dddd, M/D/YY')}
      </h2>
      <h2 className="signup-form-fridge">{job.name}</h2>

      <h3>Click submit to sign up for this slot</h3>
      {loading ? (
        <Loading />
      ) : (
        <button onClick={onSubmit} className="shift-detail-submit">
          Confirm Signup
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.event.jobs,
    shifts: state.event.shifts,
  };
};

export default connect(mapStateToProps, actions)(EventShiftSignup);
