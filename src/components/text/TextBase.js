import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import * as actions from '../../actions';

const Text = ({ user, getFridges }) => {
  useEffect(() => {
    getFridges();
  }, [getFridges]);
  const renderSignIn = () => {
    return <h3>You must have the proper permissions to access this page.</h3>;
  };

  return (
    <div className="main text-home">
      <h1 className="page-header">Text Service</h1>
      {user && (user.admin || user.textPermission) ? (
        <Outlet />
      ) : (
        renderSignIn()
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, actions)(Text);
