import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import Loading from '../../reusable/loading/Loading';
import {
  useGetEventsQuery,
  useSignUpForVolunteerShiftMutation,
} from '../../../state/apis/volunteerApi';

const EventShiftSignup = () => {
  const navigate = useNavigate();
  const { shiftId, id } = useParams();

  const [signUpForVolunteerShift, { isLoading }] =
    useSignUpForVolunteerShiftMutation();

  const { data } = useGetEventsQuery();
  const campaign = data?.find((cam) => cam.id === id);

  const shift = shiftId
    ? campaign?.shifts.find((sh) => sh.id === shiftId)
    : undefined;
  const job = shift
    ? campaign?.jobs.find((j) => j.id === shift.job)
    : undefined;

  const onSubmit = () => {
    if (shift && shiftId && job) {
      signUpForVolunteerShift({
        shiftId,
        jobId: job.id,
        date: shift.startTime,
      });
    }
  };

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div>
      <h3>Signing up for:</h3>
      <div className="event-shift-detail">
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
          {format(new Date(shift.startTime), 'dddd, M/D/YY')}
        </p>
        <p>
          <b>Time: </b>
          {format(new Date(shift.startTime), 'h:mm a')}
        </p>
        <p>
          <b>Duration: </b>
          {shift.duration} Hours
        </p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button onClick={onSubmit} className="event-shift-detail-submit">
            Confirm Signup
          </button>
          <button onClick={() => navigate('..')} className="cancel">
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default EventShiftSignup;
