import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useState, useEffect } from 'react';

import { getHours, editHours } from '../../../actions';
import Loading from '../../reusable/Loading';

const EditShift = ({ hours, getHours, editHours }) => {
  const { id } = useParams();
  const [mealCount, setMealCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hours) {
      getHours();
    } else {
      setMealCount(hours[id].mealCount);
    }
  }, [getHours, hours, id]);

  const onSubmit = () => {
    editHours(id, mealCount);
    navigate('..');
  };

  if (!hours) {
    return <Loading />;
  }

  const hour = hours[id];

  return (
    <div>
      <h2>Edit Home Chef Delivery Details</h2>
      <div>Date: {moment(hour.time).format('M/D/YY')}</div>

      <label>Number of Meals:</label>
      <input
        type="number"
        value={mealCount}
        onChange={(e) => setMealCount(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { hours: state.homeChef.hours };
};

export default connect(mapStateToProps, { getHours, editHours })(EditShift);
