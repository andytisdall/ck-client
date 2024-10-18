import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ShiftInfo from '../ShiftInfo';
import Loading from '../../reusable/loading/Loading';
import {
  useGetKitchenHoursQuery,
  useGetKitchenShiftsQuery,
  useCancelVolunteerShiftMutation,
} from '../../../state/apis/volunteerApi';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const Confirmation = () => {
  const { hoursId, contactId } = useParams();

  const { data: hours } = useGetKitchenHoursQuery(contactId);
  const getShiftsQuery = useGetKitchenShiftsQuery();
  const jobs = getShiftsQuery.data?.jobs;
  const shifts = getShiftsQuery.data?.shifts;

  const hour = hours && hoursId ? hours[hoursId] : null;

  const job = jobs?.find((j) => j.id === hour?.job);
  const shift = hour?.shift && shifts && shifts[hour.shift];

  const canceled = hour?.status === 'Canceled';

  const [cancelShift, { isLoading }] = useCancelVolunteerShiftMutation();

  const dispatch = useDispatch();

  const onCancel = () => {
    if (hoursId) {
      cancelShift({ hoursId, contactId })
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
    if (job && shift) {
      return (
        <div className="hc-confirm-details">
          <p className={canceled ? 'cancel-text' : ''}>{message}</p>
          <ShiftInfo job={job} shift={shift} />
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
      {getShiftsQuery.isFetching ? <Loading /> : renderShiftDetails()}

      <Link to="/volunteers/ck-kitchen">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
      {renderCancelButton()}
    </div>
  );
};

export default Confirmation;
