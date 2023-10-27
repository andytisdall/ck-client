import { useParams, useNavigate } from 'react-router-dom';
import { useState, FormEventHandler } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useDispatch } from 'react-redux';

import { setAlert } from '../../../state/apis/slices/alertSlice';
import Loading from '../../reusable/loading/Loading';
import {
  useEditHoursMutation,
  useGetHomeChefHoursQuery,
  useGetShiftsQuery,
} from '../../../state/apis/volunteerApi';

const EditShift = () => {
  const { id } = useParams();

  const { data: hours, isLoading: hoursLoading } = useGetHomeChefHoursQuery();
  const hour = hours && id ? hours[id] : undefined;

  const [mealCount, setMealCount] = useState(hour?.mealCount || '');
  const [cancel, setCancel] = useState(false);

  const { data } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const dispatch = useDispatch();

  const [editHours, { isLoading }] = useEditHoursMutation();

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if ((!mealCount || parseInt(mealCount, 10) < 1) && !cancel) {
      throw Error('Invalid number of meals');
    }
    if (jobs) {
      const fridge = jobs.find((j) => j.id === hour?.job)?.name;
      if (id && fridge && hour)
        editHours({ id, mealCount, cancel, fridge, date: hour.time })
          .unwrap()
          .then(() => {
            const action = cancel ? 'Canceled' : 'Edited';
            dispatch(setAlert('Delivery ' + action));
            navigate('..');
          });
    }
  };

  if (hoursLoading) {
    return <Loading />;
  }

  const renderCancel = () => {
    let text;
    if (hour?.status === 'Confirmed') {
      text = 'Check here to cancel this delivery';
    }
    if (hour?.status === 'Completed') {
      text = 'Check here if you did not make this delivery';
    }
    return (
      <div className="chef-cancel">
        <label htmlFor="cancel">{text}</label>
        <input
          type="checkbox"
          id="cancel"
          checked={cancel}
          onChange={(e) => setCancel(e.target.checked)}
        />
      </div>
    );
  };

  const meals = cancel ? 0 : mealCount;

  if (!hour) {
    return <div>This shift cannot be edited.</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Edit Home Chef Delivery Details</h2>
      <div>
        Date:{' '}
        {format(utcToZonedTime(hour.time, 'America/Los_Angeles'), 'M/d/yy')}
      </div>

      <label>Number of Meals:</label>
      <input
        type="number"
        value={meals}
        onChange={(e) => setMealCount(e.target.value)}
        required
      />
      {renderCancel()}
      {isLoading ? <Loading /> : <input type="Submit" />}
    </form>
  );
};

export default EditShift;
