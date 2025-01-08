import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';
import { useLazyGetVolunteerQuery } from '../state/apis/volunteerApi';
import { useGetUserInfoQuery } from '../state/apis/authApi';
import Loading from '../components/reusable/loading/Loading';

const useVolunteerWaiver = (campaignId?: string) => {
  const [redirectToDocusign, setRedirectToDocusign] = useState(false);

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const intervalRef = useRef<ReturnType<typeof setTimeout>>();

  const [getVolunteer] = useLazyGetVolunteerQuery();

  const {
    data: userInfo,
    isFetching,
    isLoading,
  } = useGetUserInfoQuery(undefined, { pollingInterval: 60000 });

  const navigate = useNavigate();
  const docusignLink = useRef('');

  useEffect(() => {
    if (!isFetching) {
      if (!volunteer && !userInfo) {
        navigate('../signin/' + campaignId);
      } else if (volunteer && !volunteer.volunteerAgreement) {
        setRedirectToDocusign(true);
        docusignLink.current = '../../sign/CKK/' + volunteer.id;
      } else if (userInfo && !userInfo?.volunteerAgreement) {
        setRedirectToDocusign(true);
        docusignLink.current = '../../sign/CKK';
      } else if (userInfo && userInfo.volunteerAgreement) {
        setRedirectToDocusign(false);
      } else if (volunteer && volunteer.volunteerAgreement) {
        setRedirectToDocusign(false);
      }
    }
  }, [volunteer, navigate, isFetching, userInfo, campaignId]);

  useEffect(() => {
    if (redirectToDocusign && volunteer?.email) {
      intervalRef.current = setInterval(() => {
        getVolunteer(volunteer.email);
      }, 10000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToDocusign]);

  if (isLoading) {
    return <Loading />;
  }

  if (redirectToDocusign) {
    return (
      <div>
        <h3>CK Volunteer Waiver</h3>
        <p>
          Before you can sign up to volunteer, you'll need to sign an agreement.
        </p>
        <p>
          If you just signed the agreement, please wait up to one minute for the
          page to update.
        </p>
        <button onClick={() => navigate(docusignLink.current)}>Continue</button>
      </div>
    );
  }
};

export default useVolunteerWaiver;
