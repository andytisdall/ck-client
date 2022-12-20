import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

import './TextMain.css';
import { getUser } from '../../actions';

const Text = ({ user }) => {
  const renderSignIn = () => {
    return <h3>You must be an admin to access this page.</h3>;
  };

  return (
    <div className="main text-home">
      <h1 className="page-header">Text Service</h1>
      {user && user.admin ? <Outlet /> : renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, { getUser })(Text);
