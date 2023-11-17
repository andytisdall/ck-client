import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { format, utcToZonedTime } from 'date-fns-tz';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import './VolunteerEvent.css';
import Loading from '../../reusable/loading/Loading';
import { useGetEventsQuery } from '../../../state/apis/volunteerApi';
import { useGetUserInfoQuery } from '../../../state/apis/authApi';

const VolunteerEvent = () => {
  const [redirectToDocusign, setRedirectToDocusign] = useState(false);

  const { id } = useParams();
  const events = useGetEventsQuery().data;

  const campaign = events?.find((c) => c.id === id);

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: userInfo, isFetching } = useGetUserInfoQuery();

  const navigate = useNavigate();
  const docusignLink = useRef('');

  useEffect(() => {
    if (!isFetching) {
      if (!volunteer && !userInfo) {
        navigate('../signin/' + id);
      } else if (volunteer && volunteer.ckKitchenStatus !== 'Active') {
        setRedirectToDocusign(true);
        docusignLink.current = '../../docusign/sign/CKK/' + volunteer.id;
      } else if (userInfo && userInfo?.ckKitchenStatus !== 'Active') {
        setRedirectToDocusign(true);
        docusignLink.current = '../../docusign/sign/CKK';
      }
    }
  }, [volunteer, navigate, isFetching, userInfo, id]);

  const startDate = campaign?.startDate
    ? format(
        utcToZonedTime(campaign.startDate, 'America/Los_Angeles'),
        'eeee, MMMM do'
      )
    : '';

  const endDate = campaign?.endDate
    ? ' - ' +
      format(
        utcToZonedTime(campaign?.endDate, 'America/Los_Angeles'),
        'eeee, MMMM do'
      )
    : '';

  const date = startDate + endDate;

  if (!campaign) {
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

  return (
    <div>
      <h1 className="volunteers-main-header volunteers-kitchen-header">
        {campaign.name}
      </h1>
      <h3>{date}</h3>
      <p className="volunteers-home-section-body">{campaign.description}</p>
      <Outlet />
    </div>
  );
};

export default VolunteerEvent;
