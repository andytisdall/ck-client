import { Outlet, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Loading from '../../reusable/loading/Loading';
import { useGetVolunteerQuery } from '../../../state/apis/volunteerApi';
import {
  useGetUserInfoQuery,
  useGetUserQuery,
} from '../../../state/apis/authApi';
import { navLink } from '../../../utils/style';

const ShiftSignup = () => {
  const [redirectToDocusign, setRedirectToDocusign] = useState(false);

  const { email } = useParams();
  const getVolunteerQuery = useGetVolunteerQuery(email || '');
  const volunteer = getVolunteerQuery.data;

  const getUserQuery = useGetUserQuery();
  const user = getUserQuery.data;

  const getUserInfoQuery = useGetUserInfoQuery();
  const userInfo = getUserInfoQuery.data;

  const navigate = useNavigate();

  const docusignLink = useRef('');

  useEffect(() => {
    if (!getVolunteerQuery.isFetching) {
      if (!volunteer && !user) {
        navigate('../signin');
      } else if (!volunteer?.ckKitchenAgreement && email) {
        setRedirectToDocusign(true);
        docusignLink.current = '../docusign/sign/CKK/' + email;
      } else if (userInfo?.ckKitchenStatus !== 'Active') {
        docusignLink.current = '../docusign/sign/CKK';
      }
    }
  }, [user, getVolunteerQuery, volunteer, navigate, userInfo, email]);

  const renderSignup = () => {
    return (
      <>
        <div className="volunteers-shift-signup-links">
          <NavLink to="list" className={navLink}>
            List View
          </NavLink>
          <NavLink to="calendar" className={navLink}>
            Calendar View
          </NavLink>
        </div>
        <Outlet />
      </>
    );
  };

  const isLoading = getUserQuery.isLoading || getVolunteerQuery.isFetching;

  if (isLoading) {
    return <Loading />;
  }

  if (redirectToDocusign) {
    return (
      <div>
        <p>
          Before you can sign up to volunteer in the CK Kitchen, you'll need to
          sign an agreement.
        </p>
        <button onClick={() => navigate(docusignLink.current)}>Continue</button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="volunteers-header">Volunteer Opportunities</h3>
      {renderSignup()}
    </div>
  );
};

export default ShiftSignup;
