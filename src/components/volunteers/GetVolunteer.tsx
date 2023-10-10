import { useState, FormEventHandler } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Loading from '../reusable/loading/Loading';
import { useGetUserQuery } from '../../state/apis/authApi';

import EnterEmail from './EnterEmail';
import EnterName from './EnterName';
import {
  useLazyGetVolunteerQuery,
  useCreateVolunteerMutation,
  useGetKitchenShiftsQuery,
  useSignUpForVolunteerShiftMutation,
} from '../../state/apis/volunteerApi';

const GetVolunteer = () => {
  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [getVolunteer, getVolunteerResult] = useLazyGetVolunteerQuery();
  const [createVolunteer, createVolunteerResult] = useCreateVolunteerMutation();

  const getShiftsQuery = useGetKitchenShiftsQuery();
  const shifts = getShiftsQuery.data?.shifts;
  const jobs = getShiftsQuery.data?.jobs;

  const getUserQuery = useGetUserQuery();
  const user = getUserQuery.data;

  const [signUpForVolunteerShift, signUpForVolunteerShiftResult] =
    useSignUpForVolunteerShiftMutation();

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!showNameFields) {
      getVolunteer(email)
        .unwrap()
        .then((volunteer) => {
          if (!volunteer) {
            setShowNameFields(true);
          } else if (job) {
            signUpForVolunteerShift({
              shiftId: shift.id,
              jobId: job.id,
              date,
              contactSalesforceId: volunteer.id,
            })
              .unwrap()
              .then((hours) =>
                navigate('/volunteers/ck-kitchen/signup-confirm/' + hours.id)
              );
          }
        });
    } else {
      createVolunteer({ email, firstName, lastName })
        .unwrap()
        .then((volunteer) => {
          if (job) {
            signUpForVolunteerShift({
              shiftId: shift.id,
              jobId: job.id,
              date,
              contactSalesforceId: volunteer.id,
            })
              .unwrap()
              .then((hours) =>
                navigate('/volunteers/ck-kitchen/signup-confirm/' + hours.id)
              );
          }
        });
    }
  };

  const { shiftId } = useParams();
  if (
    getUserQuery.isLoading ||
    getShiftsQuery.isLoading ||
    signUpForVolunteerShiftResult.isLoading
  ) {
    return <Loading />;
  }

  if (!shifts || !shiftId || !shifts[shiftId]) {
    return <div>Volunteer shift not found. Please start over.</div>;
  }

  const shift = shifts[shiftId];
  const job = jobs?.find((j) => j.id === shift.job);
  const date = shift.startTime;
  if (user && job) {
    signUpForVolunteerShift({
      shiftId: shift.id,
      jobId: job.id,
      date,
      contactSalesforceId: user.salesforceId,
    })
      .unwrap()
      .then((hours) =>
        navigate('/volunteers/ck-kitchen/signup-confirm/' + hours.id)
      );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <EnterEmail email={email} setEmail={setEmail} />
        {showNameFields && (
          <EnterName
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
          />
        )}
        {getVolunteerResult.isLoading || createVolunteerResult.isLoading ? (
          <Loading />
        ) : (
          <input type="submit" />
        )}
      </form>
    </div>
  );
};

export default GetVolunteer;
