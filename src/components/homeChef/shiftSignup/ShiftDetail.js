import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../../actions';
import Loading from '../../reusable/Loading';

const ShiftDetail = ({ jobs, shifts, signUpForShift, error }) => {
  const [mealCount, setMealCount] = useState('');
  const [soup, setSoup] = useState(false);
  const [loading, setLoading] = useState(false);

  const { shiftId } = useParams();

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signUpForShift(shiftId, mealCount, job.id, shift.startTime, soup);
  };

  if (!shifts || !jobs) {
    return <Loading />;
  }

  const shift = shifts[shiftId];
  const job = jobs.find((j) => j.id === shift.job);

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
      <p>{job.location}</p>

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
              required
              id="meal-count"
              value={mealCount}
              onChange={(e) => setMealCount(e.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              value={soup}
              onChange={(e) => setSoup(e.target.checked)}
              name="soup"
            />
            <label htmlFor="soup">This meal is soup</label>
          </div>
        </ul>
        <h3>Click submit to sign up for this slot</h3>
        {loading ? (
          <Loading />
        ) : (
          <input type="submit" className="shift-detail-submit" value="Submit" />
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
    shifts: state.homeChef.shifts,
    error: state.error.error,
  };
};

export default connect(mapStateToProps, actions)(ShiftDetail);
