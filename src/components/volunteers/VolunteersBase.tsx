import { Link, Outlet } from "react-router-dom";

const VolunteersBase = () => {
  return (
    <div className="main home-chef">
      <Link to="/volunteers">
        <h1 className="volunteers-main-header">CK Volunteers</h1>
      </Link>
      <Outlet />
    </div>
  );
};

export default VolunteersBase;
