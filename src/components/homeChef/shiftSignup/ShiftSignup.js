import { Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getShifts } from '../../../actions';
import './ShiftSignup.css';

const ShiftSignup = ({ getShifts }) => {
  useEffect(() => {
    getShifts();
  }, [getShifts]);

  return (
    <div>
      <h3>Shift Sign Up</h3>
      <div className="shift-signup-links">
        <NavLink to="list">
          <button>List View</button>
        </NavLink>
        <NavLink to="calendar">
          <button>Calendar View</button>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default connect(null, { getShifts })(ShiftSignup);
