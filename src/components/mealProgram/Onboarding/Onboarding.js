import { Outlet, Link } from 'react-router-dom';

import './Onboarding.css';

const Onboarding = () => {
  return (
    <div>
      <Link to="/meal-program/onboarding/">
        <button className="meal-program-navigate">
          Meal Program Onboarding
        </button>
      </Link>
      <Outlet />
    </div>
  );
};

export default Onboarding;
