import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Link className="text-button-link admin-home-btn" to="user">
        Create or Edit a User
      </Link>
      <Link className="text-button-link admin-home-btn" to="restaurant">
        Create or Edit a Restaurant
      </Link>
      <Link className="text-button-link admin-home-btn" to="notifications">
        Send a Push Notification
      </Link>
      <Link className="text-button-link admin-home-btn" to="d4j">
        Dining for Justice
      </Link>
      <Link
        className="text-button-link admin-home-btn"
        to="../volunteer-check-in"
      >
        Volunteer Check-In
      </Link>
      <Link className="text-button-link admin-home-btn" to="/doorfront">
        Scan Barcode
      </Link>
      {/* <Link className="text-button-link admin-home-btn" to="action">
        Take Action
      </Link> */}
    </div>
  );
};

export default AdminHome;
