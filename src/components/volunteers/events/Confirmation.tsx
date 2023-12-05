import { Link, useParams } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import { setAlert } from '../../../state/apis/slices/alertSlice';
import {
  useGetEventsQuery,
  useGetEventHoursQuery,
  useCancelVolunteerShiftMutation,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';

const Confirmation = () => {
  const { hoursId, campaignId } = useParams();

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: user } = useGetUserQuery();
  const { data } = useGetEventsQuery();
  const campaign = data?.find((cam) => cam.id === campaignId);
  const jobs = campaign?.jobs;
  const shifts = campaign?.shifts;
  const hours = useGetEventHoursQuery({
    campaignId: campaignId || '',
    contactId: volunteer?.id || user?.salesforceId || '',
  }).data;

  const hour = hours && hoursId ? hours.find((h) => h.id === hoursId) : null;

  const [cancelShift, { isLoading }] = useCancelVolunteerShiftMutation();

  const dispatch = useDispatch();

  const onCancel = () => {
    if (hoursId) {
      cancelShift({ hoursId, contactId: volunteer?.id || user?.salesforceId })
        .unwrap()
        .then(() =>
          dispatch(setAlert('You have canceled your volunteer shift'))
        );
    }
  };

  const renderCancelButton = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (hour?.status !== 'Canceled') {
      return (
        <button onClick={onCancel} className="cancel">
          Cancel Your Booked Volunteer Time
        </button>
      );
    }
  };

  const renderVolunteer = () => {
    if (volunteer) {
      return (
        <div className="vol-info">
          <b>Your Info:</b>
          <ul>
            <li>
              <b>Name:</b> {volunteer.name}
            </li>
          </ul>
        </div>
      );
    }
  };

  const confirmMessage = <p>You have successfully signed up for this shift:</p>;

  const cancelMessage = (
    <p className="cancel-text">You have canceled this shift:</p>
  );

  const message = hour?.status === 'Canceled' ? cancelMessage : confirmMessage;

  const renderShiftDetails = () => {
    const job = jobs?.find((j) => j.id === hour?.job);
    const shift = shifts?.find((sh) => sh.id === hour?.shift);
    if (hour && shift && job) {
      return (
        <div className="hc-confirm-details">
          {message}
          <ul>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Date:</span>
              {format(
                utcToZonedTime(hour.time, 'America/Los_Angeles'),
                'eeee, M/d/yy'
              )}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Time:</span>
              {format(
                utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                'h:mm a'
              )}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Duration:</span>
              {shift.duration} Hours
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Location:</span> {job.location}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Job:</span> {job.name}
            </li>
            <li className="hc-confirm-item">
              <span className="hc-confirm-title">Description:</span>
              {job.description}
            </li>
          </ul>
          {renderVolunteer()}
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

  const noData = () => {
    return <p>Could not find the requested info.</p>;
  };

  return (
    <div>
      <h1>Volunteer Sign Up Confirmation</h1>
      {!jobs || !hours ? noData() : renderShiftDetails()}
      <Link to="/volunteers">
        <button className="hc-confirm-button">Volunteers Home</button>
      </Link>
      {renderCancelButton()}
    </div>
  );
};

export default Confirmation;
