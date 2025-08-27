import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Link className="text-button-link admin-home-btn" to="user">
        Create or Edit a User
      </Link>
      <Link className="text-button-link admin-home-btn" to="notifications">
        Send a Push Notification
      </Link>
      <Link
        className="text-button-link admin-home-btn"
        to="../volunteer-check-in"
      >
        Volunteer Check-In
      </Link>
      <Link className="text-button-link admin-home-btn" to="/doorfront">
        Doorfront
      </Link>
      <Link className="text-button-link admin-home-btn" to="home-chef-supplies">
        Home Chef Supply Orders
      </Link>
    </div>
  );
};

export default AdminHome;
