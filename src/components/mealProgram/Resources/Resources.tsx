import { Outlet, Link } from 'react-router-dom';

const Resources = () => {
  return (
    <div>
      <Link to="/meal-program/resources/">
        <button className="meal-program-navigate">
          Meal Program Resources
        </button>
      </Link>
      <Outlet />
    </div>
  );
};

export default Resources;
