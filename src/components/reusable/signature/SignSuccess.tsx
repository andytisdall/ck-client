import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { optimisticallyUpdateVolunteerAgreement } from '../../../state/apis/authApi';
import Loading from '../loading/Loading';

const KITCHEN_RETURN_LINK = '/volunteers/ck-kitchen/signup/';
// const KITCHEN_RETURN_LINK = '/volunteer-check-in/confirm/

const SignSuccess = ({ returnLink }: { returnLink?: string }) => {
  const { contactId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (returnLink) {
      dispatch(optimisticallyUpdateVolunteerAgreement);
    } else {
      setTimeout(() => {
        navigate(KITCHEN_RETURN_LINK + contactId);
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Signing Completed</h3>
      <p>Please allow up to 2 minutes for your profile to update.</p>
      <Loading />
      {!!returnLink && (
        <Link to={returnLink}>
          <button>Continue</button>
        </Link>
      )}
    </div>
  );
};

export default SignSuccess;
