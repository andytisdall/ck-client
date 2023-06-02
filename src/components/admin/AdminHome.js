import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Link className="text-button-link" to="user">
        Create or Edit a User
      </Link>
      <Link className="text-button-link" to="restaurant">
        Create or Edit a Restaurant
      </Link>
    </div>
  );
};

export default AdminHome;
