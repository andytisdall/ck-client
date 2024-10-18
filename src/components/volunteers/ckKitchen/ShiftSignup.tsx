import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

import { RootState } from '../../../state/store';
import {
  useGetKitchenShiftsQuery,
  useSignUpForVolunteerShiftMutation,
  useGetKitchenHoursQuery,
} from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';
import ShiftInfo from '../ShiftInfo';

const ShiftSignup = () => {
  const navigate = useNavigate();
  const { shiftId } = useParams();

  const [signUpForVolunteerShift, signUpForVolunteerShiftResult] =
    useSignUpForVolunteerShiftMutation();

  const kitchenShiftsQuery = useGetKitchenShiftsQuery();

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const shifts = kitchenShiftsQuery.data?.shifts;
  const jobs = kitchenShiftsQuery.data?.jobs;
  const shift = shifts && shiftId ? shifts[shiftId] : undefined;
  const job = jobs?.find((j) => j.id === shift?.job);
  const date = shift?.startTime;

  const getUserQuery = useGetUserQuery();
  const user = getUserQuery.data;

  const getKitchenHoursQuery = useGetKitchenHoursQuery(
    volunteer?.id || user?.salesforceId
  );
  const hours = getKitchenHoursQuery.data;

  const bookedJobs = useMemo(() => {
    return hours
      ? Object.values(hours)
          .filter((h) => h.status === 'Confirmed')
          .map((h) => h.shift)
      : [];
  }, [hours]);

  useEffect(() => {
    if (hours && shiftId && bookedJobs.includes(shiftId)) {
      const hour = Object.values(hours).find(
        (h) => h.shift === shiftId && h.status === 'Confirmed'
      );
      if (hour) {
        navigate('../../signup-confirm/' + hour.id);
      }
    }
  }, [hours, shiftId, navigate, bookedJobs]);

  const isLoading =
    signUpForVolunteerShiftResult.isLoading || kitchenShiftsQuery.isLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (!shift?.open) {
    return <p>This shift is not available for signup</p>;
  }

  if (!job) {
    return <p>Job info not found.</p>;
  }

  return (
    <div className="volunteer-signup">
      <h3 className="volunteers-signup-btns">Signing up for:</h3>
      <ShiftInfo job={job} shift={shift} />
      <div className="volunteers-signup-btns">
        <button onClick={() => navigate('../list')} className="cancel">
          Cancel
        </button>
        <button
          onClick={() => {
            if (job && shift && date) {
              let contactSalesforceId = '';
              if (user) {
                contactSalesforceId = user.salesforceId;
              }
              if (volunteer) {
                contactSalesforceId = volunteer.id;
              }
              if (contactSalesforceId) {
                signUpForVolunteerShift({
                  shiftId: shift.id,
                  jobId: job.id,
                  date,
                  contactSalesforceId,
                })
                  .unwrap()
                  .then((hours) =>
                    navigate(
                      `/volunteers/ck-kitchen/signup-confirm/${hours.id}/${contactSalesforceId}`
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
