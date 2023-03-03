import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useState, useEffect } from 'react';

import { getHours, editHours } from '../../../actions';
import Loading from '../../reusable/Loading';

const EditShift = ({ hours, getHours, editHours }) => {
  const { id } = useParams();
  const [mealCount, setMealCount] = useState(0);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (!hours) {
      getHours();
    } else {
      setMealCount(hours[id].mealCount);
    }
  }, [getHours, hours, id]);

  const onSubmit = () => {
    editHours(id, mealCount, cancel);
  };

  if (!hours) {
    return <Loading />;
  }

  const hour = hours[id];

  const renderCancel = () => {
    let text;
    if (hour.status === 'Confirmed') {
      text = 'Check here to cancel this delivery';
    }
    if (hour.status === 'Completed') {
      text = 'Check here if you did not make this delivery';
    }
    return (
      <div className="chef-cancel">
        <label htmlFor="cancel">{text}</label>
        <input
          type="checkbox"
          id="cancel"
          value={cancel}
          onChange={(e) => setCancel(e.target.checked)}
        />
      </div>
    );
  };

  const meals = cancel ? 0 : mealCount;

  return (
    <div>
      <h2>Edit Home Chef Delivery Details</h2>
      <div>Date: {moment(hour.time).format('M/D/YY')}</div>

      <label>Number of Meals:</label>
      <input
        type="number"
        value={meals}
        onChange={(e) => setMealCount(e.target.value)}
      />
      {renderCancel()}
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { hours: state.homeChef.hours };
};

export default connect(mapStateToProps, { getHours, editHours })(EditShift);
