import { Outlet, NavLink, Link } from 'react-router-dom';

import { navLink } from '../../../utils/style';
import './ShiftSignup.css';
import { useGetUserInfoQuery } from '../../../state/apis/authApi';

const ShiftSignup = () => {
  const userInfo = useGetUserInfoQuery().data;

  const renderInactive = () => {
    return (
      <div>
        <Link to="../onboarding" className="retro-link">
          You must finish the onboarding process before you can sign up for Home
          Chef deliveries.
        </Link>
      </div>
    );
  };

  const renderSignup = () => {
    return (
      <>
        <div className="shift-signup-links">
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

  const renderContent = () => {
    if (!userInfo || userInfo.homeChefStatus !== 'Active') {
      return renderInactive();
    }
    return renderSignup();
  };

  return (
    <div className="shift-signup">
      <h1>Town Fridge Sign Up</h1>
      {renderContent()}
    </div>
  );
};

export default ShiftSignup;
