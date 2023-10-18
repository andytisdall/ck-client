import { useParams, useNavigate } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';

import {
  useGetKitchenShiftsQuery,
  useSignUpForVolunteerShiftMutation,
  useGetVolunteerQuery,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';

const ShiftSignup = () => {
  const navigate = useNavigate();
  const { shiftId, email } = useParams();

  const [signUpForVolunteerShift, signUpForVolunteerShiftResult] =
    useSignUpForVolunteerShiftMutation();

  const kitchenShiftsQuery = useGetKitchenShiftsQuery();

  const getVolunteerQuery = useGetVolunteerQuery(email || '');
  const volunteer = getVolunteerQuery.data;

  const shifts = kitchenShiftsQuery.data?.shifts;
  const jobs = kitchenShiftsQuery.data?.jobs;
  const shift = shifts && shiftId ? shifts[shiftId] : undefined;
  const job = jobs?.find((j) => j.id === shift?.job);
  const date = shift?.startTime;

  const getUserQuery = useGetUserQuery();
  const user = getUserQuery.data;

  const isLoading =
    signUpForVolunteerShiftResult.isLoading ||
    kitchenShiftsQuery.isLoading ||
    getVolunteerQuery.isLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  return (
    <div className="volunteer-signup">
      <h3 className="volunteers-signup-btns">Signing up for:</h3>
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
      </div>
      <div className="volunteers-signup-btns">
        <button onClick={() => navigate('../list')} className="cancel">
          Cancel
        </button>
        <button
          onClick={() => {
            if (job && shift && date) {
              if (user) {
                signUpForVolunteerShift({
                  shiftId: shift.id,
                  jobId: job.id,
                  date,
                  contactSalesforceId: user.salesforceId,
                })
                  .unwrap()
                  .then((hours) =>
                    navigate(
                      `/volunteers/ck-kitchen/signup-confirm/${hours.id}/${user.salesforceId}`
                    )
                  );
              } else if (volunteer) {
                signUpForVolunteerShift({
                  shiftId: shift.id,
                  jobId: job.id,
                  date,
                  contactSalesforceId: volunteer.id,
                })
                  .unwrap()
                  .then((hours) =>
                    navigate(
                      `/volunteers/ck-kitchen/signup-confirm/${hours.id}/${volunteer.id}`
                    )
                  );
              }
            }
          }}
        >
          Confirm Signup
        </button>
      </div>
    </div>
  );
};

export default ShiftSignup;
