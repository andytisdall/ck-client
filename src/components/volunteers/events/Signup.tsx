import { useParams, useNavigate } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import Loading from '../../reusable/loading/Loading';
import {
  useGetEventsQuery,
  useSignUpForVolunteerShiftMutation,
  useGetEventHoursQuery,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';

const EventShiftSignup = () => {
  const navigate = useNavigate();
  const { shiftId, id } = useParams();

  const [signUpForVolunteerShift, { isLoading }] =
    useSignUpForVolunteerShiftMutation();

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data } = useGetEventsQuery();
  const campaign = data?.find((cam) => cam.id === id);

  const { data: user } = useGetUserQuery();

  const { data: hours } = useGetEventHoursQuery({
    campaignId: id || '',
    contactId: user?.salesforceId || '',
  });

  const bookedJobs = useMemo(() => {
    return hours
      ? hours.filter((h) => h.status === 'Confirmed').map((h) => h.shift)
      : [];
  }, [hours]);

  const shift = shiftId
    ? campaign?.shifts.find((sh) => sh.id === shiftId)
    : undefined;
  const job = shift
    ? campaign?.jobs.find((j) => j.id === shift.job)
    : undefined;

  useEffect(() => {
    if (hours && shiftId && bookedJobs.includes(shiftId)) {
      const hour = hours.find(
        (h) => h.shift === shiftId && h.status === 'Confirmed'
      );
      if (hour) {
        navigate(`../../signup-confirm/${id}/${hour.id}`);
      }
    }
  }, [hours, shiftId, navigate, bookedJobs, id]);

  const onSubmit = () => {
    if (shift && shiftId && job) {
      let contactSalesforceId = '';
      if (user) {
        contactSalesforceId = user.salesforceId;
      }
      if (volunteer) {
        contactSalesforceId = volunteer.id;
      }
      signUpForVolunteerShift({
        shiftId,
        jobId: job.id,
        date: shift.startTime,
        contactSalesforceId,
      })
        .unwrap()
        .then((hour) => {
          navigate(`../../signup-confirm/${id}/${hour.id}`);
        });
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

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div>
      <h3 className="volunteers-signup-btns">Confirm your signup:</h3>
      <div className="volunteers-shift-detail">
        <p>
          <b>Job:</b> {job?.name}
        </p>
        <p>
          <b>Description:</b> {job?.description}
        </p>
        <p>
          <b>Location:</b> {job?.location}
        </p>
        <p>
          <b>Date: </b>
          {format(
            utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
            'eeee, M/d/yy'
          )}
        </p>
        <p>
          <b>Time: </b>
          {format(
            utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
            'h:mm a'
          )}
        </p>
        <p>
          <b>Duration: </b>
          {shift.duration} Hours
        </p>
        {renderVolunteer()}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="volunteers-signup-btns">
          <button onClick={onSubmit}>Confirm Signup</button>
          <button onClick={() => navigate('/volunteers')} className="cancel">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EventShiftSignup;
