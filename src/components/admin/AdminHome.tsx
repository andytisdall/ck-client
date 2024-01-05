import { Link } from 'react-router-dom';

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
    </div>
  );
};

export default AdminHome;
