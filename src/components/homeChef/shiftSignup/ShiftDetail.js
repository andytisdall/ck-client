import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { signUpForShift } from '../../../actions/homeChef';
import Loading from '../../reusable/Loading';

const ShiftDetail = ({ jobs, shifts, signUpForShift, error, alert }) => {
  const [mealCount, setMealCount] = useState('');
  const [loading, setLoading] = useState(false);

  const { shiftId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (alert) {
      navigate('..');
    }
  }, [alert, navigate]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signUpForShift(shiftId, mealCount, job.id, shift.startTime);
  };

  if (!shifts || !jobs) {
    return <Loading />;
  }

  const shift = shifts[shiftId];
  const job = jobs.find((j) => j.id === shift.job);

  return (
    <div>
      <h2>{moment(shift.startTime).format('dddd, M/D/YY')}</h2>
      <h3>
        Enter the number of meals you are commiting to bring to {job.name}
      </h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="meal-count">Number of Meals:</label>
        <input
          type="number"
          placeholder="25"
          required
          id="meal-count"
          value={mealCount}
          onChange={(e) => setMealCount(e.target.value)}
        />
        {loading ? <Loading /> : <input type="submit" />}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.homeChef.jobs,
    shifts: state.homeChef.shifts,
    error: state.error.error,
    alert: state.alert.message,
  };
};

export default connect(mapStateToProps, { signUpForShift })(ShiftDetail);
