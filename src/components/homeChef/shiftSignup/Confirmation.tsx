import { Link, useParams } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';

import Loading from '../../reusable/loading/Loading';
import {
  useGetHomeChefHoursQuery,
  useGetShiftsQuery,
} from '../../../state/apis/volunteerApi/homeChefApi';

const Confirmation = () => {
  const { hoursId } = useParams();

  const hours = useGetHomeChefHoursQuery().data;
  const { data } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const hour = hours && hoursId ? hours[hoursId] : null;

  const renderShiftDetails = () => {
    const job = jobs?.find((j) => j.id === hour?.job);
    if (hour && job) {
      return (
        <div className="hc-confirm-details">
          <p>You have successfully signed up for this shift:</p>
          <ul>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Date:</span>{' '}
              {format(
                utcToZonedTime(hour.time, 'America/Los_Angeles'),
                'eeee, M/d/yy'
              )}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Fridge:</span> {job.name}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Location:</span> {job.location}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Number of Meals:</span>{' '}
              {hour.mealCount}
            </li>
          </ul>
          <p>You have been sent an email with this information.</p>
        </div>
      );
    } else {
      return (
        <div className="hc-confirm-details">
          Could not find the details of this shift.
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Home Chef Sign Up Confirmation</h1>
      {!jobs || !hours ? <Loading /> : renderShiftDetails()}
      <Link to="/home-chef/signup/list">
        <button className="hc-confirm-button">Sign Up for More Shifts</button>
      </Link>
      <Link to="/home-chef/chef" className="hc-confirm-button">
        <button className="hc-confirm-button">
          See your future and past shifts
        </button>
      </Link>
    </div>
  );
};

export default Confirmation;
