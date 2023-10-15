import { useState, FormEventHandler, useEffect } from 'react';
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
  const { shiftId } = useParams();

  const [email, setEmail] = useState('');
  const [showNameFields, setShowNameFields] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [getVolunteer, getVolunteerResult] = useLazyGetVolunteerQuery();
  const [createVolunteer, createVolunteerResult] = useCreateVolunteerMutation();

  const getShiftsQuery = useGetKitchenShiftsQuery();
  const shifts = getShiftsQuery.data?.shifts;
  const jobs = getShiftsQuery.data?.jobs;

  const shift = shifts && shiftId ? shifts[shiftId] : undefined;
  const job = jobs?.find((j) => j.id === shift?.job);
  const date = shift?.startTime;

  const getUserQuery = useGetUserQuery();
  const user = getUserQuery.data;

  const [signUpForVolunteerShift, signUpForVolunteerShiftResult] =
    useSignUpForVolunteerShiftMutation();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user && job && shift && date) {
  //     signUpForVolunteerShift({
  //       shiftId: shift.id,
  //       jobId: job.id,
  //       date,
  //       contactSalesforceId: user.salesforceId,
  //     })
  //       .unwrap()
  //       .then((hours) =>
  //         navigate(
  //           `/volunteers/ck-kitchen/signup-confirm/${hours.id}/${user.salesforceId}`
  //         )
  //       );
  //   }
  // }, [date, job, user, shift, signUpForVolunteerShift, navigate]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!showNameFields) {
      getVolunteer(email)
        .unwrap()
        .then((volunteer) => {
          if (!volunteer) {
            setShowNameFields(true);
            // } else if (job && shift && date) {
            //   signUpForVolunteerShift({
            //     shiftId: shift.id,
            //     jobId: job.id,
            //     date,
            //     contactSalesforceId: volunteer.id,
            //   })
            //     .unwrap()
            //     .then((hours) =>
            //       navigate(
            //         `/volunteers/ck-kitchen/signup-confirm/${hours.id}/${volunteer.id}`
            //       )
            //     );
            // }
          } else {
            navigate('../signup');
          }
        });
    } else {
      createVolunteer({ email, firstName, lastName })
        .unwrap()
        .then((volunteer) => {
          //   if (job && shift && date) {
          //     signUpForVolunteerShift({
          //       shiftId: shift.id,
          //       jobId: job.id,
          //       date,
          //       contactSalesforceId: volunteer.id,
          //     })
          //       .unwrap()
          //       .then((hours) =>
          //         navigate(
          //           `/volunteers/ck-kitchen/signup-confirm/${hours.id}/${volunteer.id}`
          //         )
          //       );
          //   }
          // });
          navigate('../signup');
        });
    }
  };

  if (
    getUserQuery.isLoading ||
    getShiftsQuery.isLoading ||
    signUpForVolunteerShiftResult.isLoading
  ) {
    return <Loading />;
  }

  if (!shift) {
    return <div>Volunteer shift not found. Please start over.</div>;
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
