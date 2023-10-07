import { useParams } from 'react-router-dom';
import { useState, FormEventHandler } from 'react';
import { format } from 'date-fns';

import {
  useGetShiftsQuery,
  useSignUpForShiftMutation,
} from '../../../state/apis/volunteerApi/homeChefApi';
import Loading from '../../reusable/loading/Loading';

const ShiftDetail = () => {
  const [mealCount, setMealCount] = useState('');
  const [soup, setSoup] = useState(false);

  const { data, isLoading } = useGetShiftsQuery();
  const [signUpForShift] = useSignUpForShiftMutation();

  const shifts = data?.shifts;
  const jobs = data?.jobs;

  const { shiftId } = useParams();

  const onSubmit: FormEventHandler = (e) => {
    if (job && shift && shiftId) {
      e.preventDefault();
      signUpForShift({
        shiftId,
        mealCount,
        jobId: job.id,
        date: shift.startTime,
        soup,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const shift = shifts && shiftId ? shifts[shiftId] : null;
  const job = jobs?.find((j) => j.id === shift?.job);

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div className="shift-detail">
      <h2>Signing up for:</h2>
      <h2 className="signup-form-date">
        {format(new Date(shift.startTime), 'dddd, M/D/YY')}
      </h2>
      <h2 className="signup-form-fridge">{job?.name}</h2>
      <p>{job?.location}</p>

      <form onSubmit={onSubmit} className="shift-signup-form">
        <ul>
          <div className="shift-detail-meal-number">
            <div>
              <label htmlFor="meal-count">
                Number of Meals You Plan to Deliver:
              </label>
              <div className="shift-detail-meal-number-note">
                (You can change this later)
              </div>
            </div>
            <input
              type="number"
              placeholder="25"
              min={1}
              required
              id="meal-count"
              value={mealCount}
              onChange={(e) => setMealCount(e.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={soup}
              onChange={(e) => setSoup(e.target.checked)}
              name="soup"
            />
            <label htmlFor="soup">This meal is soup</label>
          </div>
        </ul>
        <h3>Click submit to sign up for this slot</h3>
        {isLoading ? (
          <Loading />
        ) : (
          <input type="submit" className="shift-detail-submit" value="Submit" />
        )}
      </form>
    </div>
  );
};

export default ShiftDetail;
