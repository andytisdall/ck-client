import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import '../Volunteers.css';
import { navLink } from '../../../utils/style';
import { RootState } from '../../../state/store';
import { useGetUserInfoQuery } from '../../../state/apis/authApi';

const ShiftSignup = () => {
  const [redirectToDocusign, setRedirectToDocusign] = useState(false);

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const getUserInfoQuery = useGetUserInfoQuery();
  const userInfo = getUserInfoQuery.data;

  const navigate = useNavigate();

  const docusignLink = useRef('');

  useEffect(() => {
    if (!getUserInfoQuery.isFetching) {
      if (!volunteer && !userInfo) {
        navigate('../signin');
      } else if (volunteer && volunteer.ckKitchenStatus !== 'Active') {
        setRedirectToDocusign(true);
        docusignLink.current = '../docusign/sign/CKK/' + volunteer.id;
      } else if (userInfo?.ckKitchenStatus !== 'Active') {
        docusignLink.current = '../docusign/sign/CKK';
      }
    }
  }, [volunteer, navigate, getUserInfoQuery, userInfo]);

  const renderSignup = () => {
    return (
      <div className="volunteers-body">
        <div className="volunteers-shift-signup-links">
          <NavLink className={navLink} to="list">
            List
          </NavLink>
          <NavLink className={navLink} to="calendar">
            Calendar
          </NavLink>
        </div>
        <div className="volunteers-kitchen-signup-photos">
          <img
            src="/images/volunteers/cookies-1.jpg"
            alt="Sandwiches going out"
            className="volunteers-kitchen-signup-photo"
          />
          <img
            src="/images/volunteers/wraps.jpeg"
            alt=""
            className="volunteers-kitchen-signup-photo"
          />
          <img
            src="/images/volunteers/sandwiches.jpeg"
            alt=""
            className="volunteers-kitchen-signup-photo"
          />
        </div>
        <Outlet />
      </div>
    );
  };

  if (redirectToDocusign) {
    return (
      <div>
        <h3>CK Kitchen Waiver</h3>
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
