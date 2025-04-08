import { NavLink, Outlet } from 'react-router-dom';

import './Schedule.css';
import { navLink } from '../../../utils/style';

const Schedule = () => {
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

export default Schedule;
