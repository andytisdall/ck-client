import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import { useGetKitchenShiftsQuery } from '../../../state/apis/volunteerApi';
import Loading from '../../reusable/loading/Loading';

const ShiftSignup = () => {
  const navigate = useNavigate();
  const { shiftId } = useParams();

  const { data, isLoading } = useGetKitchenShiftsQuery();
  const shifts = data?.shifts;
  const jobs = data?.jobs;

  if (isLoading) {
    return <Loading />;
  }

  const shift = shifts && shiftId ? shifts[shiftId] : undefined;
  const job = jobs?.find((j) => j.id === shift?.job);

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div className="volunteer-signup">
      <h3 className="volunteers-signup-btns">Signing up for:</h3>
      <div className="volunteers-shift-detail">
        <p>
          <b>Job:</b> {job?.name}
        </p>
        <p>
          <b>Description:</b> {job?.description}
        </p>
        <p>
          <b>Location:</b> {job?.location}
        </p>
        <p>
          <b>Date: </b>
          {format(new Date(shift.startTime), 'eeee, M/d/yy')}
        </p>
        <p>
          <b>Time: </b>
          {format(new Date(shift.startTime), 'h:mm a')}
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
        <button onClick={() => navigate('../../signin/' + shiftId)}>
          Confirm Signup
        </button>
      </div>
    </div>
  );
};

export default ShiftSignup;
