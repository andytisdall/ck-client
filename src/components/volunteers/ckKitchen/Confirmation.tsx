import { Link, useParams } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';

import Loading from '../../reusable/loading/Loading';
import {
  useGetKitchenHoursQuery,
  useGetKitchenShiftsQuery,
} from '../../../state/apis/volunteerApi';

const Confirmation = () => {
  const { hoursId, contactId } = useParams();

  const getHoursQuery = useGetKitchenHoursQuery(contactId || '');
  const hours = getHoursQuery.data;
  console.log(hours);

  const getShiftsQuery = useGetKitchenShiftsQuery();
  const jobs = getShiftsQuery.data?.jobs;
  console.log(jobs);

  const hour = hours && hoursId ? hours[hoursId] : null;

  const renderShiftDetails = () => {
    if (jobs && hour) {
      const job = jobs.find((j) => j.id === hour.job);

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
              <span className="hc-confirm-title">Fridge:</span> {job?.name}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Location:</span>{' '}
              {job?.location}
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
      {getShiftsQuery.isLoading || getHoursQuery.isLoading ? (
        <Loading />
      ) : (
        renderShiftDetails()
      )}
      <Link to="/volunteers">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
    </div>
  );
};

export default Confirmation;
