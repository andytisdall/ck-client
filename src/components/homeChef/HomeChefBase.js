import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState, lazy } from 'react';

import * as actions from '../../actions';
import Loading from '../reusable/Loading';
import renderWithFallback from '../reusable/renderWithFallback';

const HomeChefStatus = lazy(() => import('./HomeChefStatus'));

const HomeChef = ({
  user,
  getUserInfo,
  error,
  getCampaign,
  getEventCampaigns,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !user.firstName) {
      getUserInfo();
      setLoading(true);
    }
    getCampaign();
    getEventCampaigns();
  }, [getUserInfo, user, getCampaign, getEventCampaigns]);

  useEffect(() => {
    if (user?.firstName || error) {
      setLoading(false);
    }
  }, [user, error]);

  const renderSignIn = () => {
    return <h3>Sign in to access this page.</h3>;
  };

  const renderNoChef = () => {
    if (!loading) {
      return (
        <div>
          <h3>You must be a CK Home Chef to access this page.</h3>
          <h3>
            To get started,{' '}
            <Link to="/forms/home-chef" className="retro-link">
              please complete the signup form.
            </Link>
          </h3>
        </div>
      );
    }
  };

  const renderHomeChef = () => {
    if (user.homeChefStatus) {
      return (
        <>
          {user.homeChefStatus !== 'Active' &&
            renderWithFallback(<HomeChefStatus />)}
          <Outlet />
        </>
      );
    } else {
      return renderNoChef();
    }
  };

  return (
    <div className="main home-chef">
      <Link to="/home-chef">
        <img
          src="/images/home-chef/home-chef-header.png"
          className="home-chef-header"
          alt="home chef header"
        />
      </Link>
      {loading && <Loading />}
      {!user && renderSignIn()}
      {!!user && renderHomeChef()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, error: state.error.error };
};

export default connect(mapStateToProps, actions)(HomeChef);
