import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';
import { useGetUserInfoQuery } from '../state/apis/authApi';
import Loading from '../components/reusable/loading/Loading';

const useVolunteerWaiver = (campaignId?: string) => {
  const [redirectToDocusign, setRedirectToDocusign] = useState(false);

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: userInfo, isFetching } = useGetUserInfoQuery();

  const navigate = useNavigate();
  const docusignLink = useRef('');

  useEffect(() => {
    if (!isFetching) {
      if (!volunteer && !userInfo) {
        navigate('../signin/' + campaignId);
      } else if (volunteer && volunteer.ckKitchenStatus !== 'Active') {
        setRedirectToDocusign(true);
        docusignLink.current = '../../docusign/sign/CKK/' + volunteer.id;
      } else if (userInfo && userInfo?.ckKitchenStatus !== 'Active') {
        setRedirectToDocusign(true);
        docusignLink.current = '../../docusign/sign/CKK';
      }
    }
  }, [volunteer, navigate, isFetching, userInfo, campaignId]);

  if (isFetching) {
    return <Loading />;
  }

  if (redirectToDocusign) {
    return (
      <div>
        <h3>CK Volunteer Waiver</h3>
        <p>
          Before you can sign up to volunteer, you'll need to sign an agreement.
        </p>
        <button onClick={() => navigate(docusignLink.current)}>Continue</button>
      </div>
    );
  }
};

export default useVolunteerWaiver;
