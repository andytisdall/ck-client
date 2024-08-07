import { Link, useParams } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import Loading from '../../reusable/loading/Loading';
import {
  useGetKitchenHoursQuery,
  useGetKitchenShiftsQuery,
  useCancelVolunteerShiftMutation,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const Confirmation = () => {
  const { hoursId, contactId } = useParams();

  const { data: user } = useGetUserQuery();
  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const [cancelShift, { isLoading }] = useCancelVolunteerShiftMutation();

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
      cancelShift({ hoursId, contactId: contactId || user?.salesforceId })
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
          <p className={canceled ? 'cancel-text' : ''}>{message}</p>
          <ul>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Date:</span>{' '}
              {format(
                utcToZonedTime(hour.time, 'America/Los_Angeles'),
                'eeee, M/d/yy'
              )}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Job:</span> {job?.name}
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

  const renderVolunteer = () => {
    if (volunteer) {
      return (
        <div className="vol-info">
          <b>Your Info:</b>
          <br />
          <ul>
            <li>
              <b>Name:</b> {volunteer.name}
            </li>
          </ul>
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
      {getShiftsQuery.isFetching || getHoursQuery.isFetching ? (
        <Loading />
      ) : (
        renderShiftDetails()
      )}
      {renderVolunteer()}

      <Link to="/volunteers/ck-kitchen">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
      {renderCancelButton()}
    </div>
  );
};

export default Confirmation;
