import { Outlet, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Loading from '../../reusable/loading/Loading';
import { useGetVolunteerQuery } from '../../../state/apis/volunteerApi';
import {
  useGetUserInfoQuery,
  useGetUserQuery,
} from '../../../state/apis/authApi';
import { navLink } from '../../../utils/style';

const ShiftSignup = () => {
  const { email } = useParams();
  const getVolunteerQuery = useGetVolunteerQuery(email || '');
  const volunteer = getVolunteerQuery.data;

  const getUserQuery = useGetUserQuery();
  const user = getUserQuery.data;

  const getUserInfoQuery = useGetUserInfoQuery();
  const userInfo = getUserInfoQuery.data;

  const navigate = useNavigate();

  useEffect(() => {
    if (!getVolunteerQuery.isFetching) {
      if (!volunteer && !user) {
        navigate('../signin');
      } else if (!volunteer?.ckKitchenAgreement && email) {
        navigate('../docusign/sign/CKK/' + email);
      } else if (userInfo?.ckKitchenStatus !== 'Active') {
        console.log('eufhce');
        navigate('../docusign/sign/CKK');
      }
    }
  }, [
    user,
    getVolunteerQuery.isFetching,
    volunteer,
    navigate,
    userInfo?.ckKitchenStatus,
    email,
  ]);

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

  const isLoading = getUserQuery.isLoading || getVolunteerQuery.isLoading;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h3 className="volunteers-header">Volunteer Opportunities</h3>
      {renderSignup()}
    </div>
  );
};

export default ShiftSignup;
