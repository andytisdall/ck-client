import { Outlet, NavLink } from 'react-router-dom';

import { navLink } from '../../../utils/style';
import './MealGuidelines.css';

const MealGuidelines = () => {
  return (
    <div>
      <h1>Meal Guidelines</h1>
      <div className="meal-program-guidelines-nav">
        <NavLink to="youth" className={navLink}>
          Youth Meal Program Guidelines
        </NavLink>

        <NavLink to="encampment" className={navLink}>
          Encampment Meal Program Guidelines
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
export default MealGuidelines;
