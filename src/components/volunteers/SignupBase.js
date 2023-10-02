import { Outlet, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { getShifts } from '../../actions';
import { navLink } from '../../utils/style';
// import './ShiftSignup.css';

const ShiftSignup = () => {
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

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, { getShifts })(ShiftSignup);
