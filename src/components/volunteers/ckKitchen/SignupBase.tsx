import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useLazyGetVolunteerQuery } from '../../../state/apis/volunteerApi';
import { useGetUserQuery } from '../../../state/apis/authApi';
import { navLink } from '../../../utils/style';

const ShiftSignup = () => {
  const [getVolunteer, getVolunteerResults] = useLazyGetVolunteerQuery();
  const { data, isLoading } = useGetUserQuery();
  const user = data;

  const navigate = useNavigate();

  useEffect(() => {
    console.log(getVolunteerResults.data);
    if (!user && !getVolunteerResults.data) {
      navigate('../signin');
    }
  }, [user, getVolunteerResults.data, navigate]);

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

  return (
    <div>
      <h3 className="volunteers-header">Volunteer Opportunities</h3>
      {renderSignup()}
    </div>
  );
};

export default ShiftSignup;
