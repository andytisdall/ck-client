import { Outlet, NavLink } from 'react-router-dom';

import { navLink } from '../../../utils/style';

const MealGuidelines = () => {
  return (
    <div>
      <h1>Meal Guidelines</h1>

      <NavLink to="youth" className={navLink}>
        Youth Meal Program Guidelines{' '}
      </NavLink>

      <NavLink to="encampment" className={navLink}>
        Encampment Meal Program Guidelines
      </NavLink>

      <Outlet />
    </div>
  );
};
export default MealGuidelines;
