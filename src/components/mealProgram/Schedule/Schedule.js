import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import './Schedule.css';
import { navLink } from '../../../utils/style';

const Schedule = ({ getMealProgramSchedule }) => {
  useEffect(() => {
    getMealProgramSchedule();
  }, [getMealProgramSchedule]);
  return (
    <>
      <div>
        <NavLink to="list" className={navLink}>
          List View
        </NavLink>
        <NavLink to="calendar" className={navLink}>
          Calendar View
        </NavLink>
      </div>
      <div className="meal-program-schedule">
        <Outlet />
      </div>
    </>
  );
};

export default connect(null, actions)(Schedule);
