import { Link, useParams } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useDispatch } from 'react-redux';

import Loading from '../../reusable/loading/Loading';
import {
  useGetKitchenHoursQuery,
  useGetKitchenShiftsQuery,
  useCancelKitchenShiftMutation,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const Confirmation = () => {
  const { hoursId, contactId } = useParams();

  const { data: user } = useGetUserQuery();

  const [cancelShift, { isLoading }] = useCancelKitchenShiftMutation();

  const getHoursQuery = useGetKitchenHoursQuery(
    contactId || user?.salesforceId
  );
  const hours = getHoursQuery.data;

  const getShiftsQuery = useGetKitchenShiftsQuery();
  const jobs = getShiftsQuery.data?.jobs;

  const hour = hours && hoursId ? hours[hoursId] : null;

  const canceled = hour?.status === 'Canceled';

  const dispatch = useDispatch();

  const onCancel = () => {
    if (hoursId) {
      cancelShift(hoursId)
        .unwrap()
        .then(() =>
          dispatch(setAlert('You have canceled your volunteer shift'))
        );
    }
  };

  const message = !canceled
    ? 'You have successfully signed up for this shift:'
    : 'This shift is canceled';

  const renderShiftDetails = () => {
    if (jobs && hour) {
      const job = jobs.find((j) => j.id === hour.job);

      return (
        <div className="hc-confirm-details">
          <p className={canceled ? 'required' : ''}>{message}</p>
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
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Description:</span>{' '}
              {job?.description}
            </li>
          </ul>
          {!canceled && (
            <p>You have been sent an email with this information.</p>
          )}
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

  const renderCancelButton = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!canceled) {
      return (
        <button onClick={onCancel} className="cancel">
          Cancel Your Booked Volunteer Time
        </button>
      );
    }
  };

  return (
    <div>
      <h1>Volunteer Sign Up Confirmation</h1>
      {getShiftsQuery.isLoading || getHoursQuery.isLoading ? (
        <Loading />
      ) : (
        renderShiftDetails()
      )}
      <Link to="/volunteers">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
      {renderCancelButton()}
    </div>
  );
};

export default Confirmation;
