import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { useLazyGetVolunteerQuery } from '../../../state/apis/volunteerApi';
import { optimisticallyUpdateVolunteerAgreement } from '../../../state/apis/authApi';
import Loading from '../loading/Loading';

const SignSuccess = ({ returnLink }: { returnLink?: string }) => {
  const { email } = useParams();
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();

  const [getVolunteer, { data: volunteer }] = useLazyGetVolunteerQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (returnLink) {
      setTimeout(() => {
        navigate(returnLink);
      }, 3000);
      dispatch(optimisticallyUpdateVolunteerAgreement);
    } else {
      intervalRef.current = setInterval(() => {
        getVolunteer(email);
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!returnLink) {
      if (volunteer?.ckKitchenStatus === 'Active') {
        clearInterval(intervalRef.current);
        navigate('../..');
      }
    }
  }, [volunteer, navigate, returnLink]);

  return (
    <div>
      <h3>Signing Completed</h3>
      <p>Allow up to one minute for your signature to process.</p>
      <Loading />
    </div>
  );
};

export default SignSuccess;
