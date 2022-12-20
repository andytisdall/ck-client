import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <Link className="home-link" to="create">
      Create a User or Restaurant
    </Link>
  );
};

export default AdminHome;
