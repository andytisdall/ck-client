import { Outlet, NavLink } from 'react-router-dom';

import { navLink } from '../../../utils/style';

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

export default ShiftSignup;
