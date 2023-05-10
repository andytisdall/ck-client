import { Outlet, NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getShifts } from '../../../actions';
import { navLink } from '../../../utils/style';
import './ShiftSignup.css';

const ShiftSignup = ({ getShifts, user }) => {
  useEffect(() => {
    getShifts();
  }, [getShifts]);

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
    if (user.homeChefStatus !== 'Active') {
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

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, { getShifts })(ShiftSignup);
