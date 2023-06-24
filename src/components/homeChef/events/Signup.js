import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../../actions';
import Loading from '../../reusable/Loading';
import useLoading from '../../../hooks/useLoading';

const EventShiftSignup = ({ jobs, shifts, signUpForEventShift }) => {
  const [loading, setLoading] = useLoading();
  const navigate = useNavigate();
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
    <div>
      <h3>Signing up for:</h3>
      <div className="event-shift-detail">
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <button onClick={onSubmit} className="event-shift-detail-submit">
            Confirm Signup
          </button>
          <button onClick={() => navigate('..')} className="cancel">
            Cancel
          </button>
        </>
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
