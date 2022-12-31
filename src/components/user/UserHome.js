import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserHome = ({ user }) => {
  return (
    <div>
      <div>You are logged in as {user.username}</div>
      <Link to="change-password" className="home-link">
        Change Password
      </Link>
      <Link to="change-username" className="home-link">
        Change Username
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(UserHome);
