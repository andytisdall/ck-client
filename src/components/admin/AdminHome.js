import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <Link className="text-button-link" to="create">
        Create a User or Restaurant
      </Link>
      <Link className="text-button-link" to="edit">
        Edit a User or Restaurant
      </Link>
    </div>
  );
};

export default AdminHome;
