import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState, lazy } from 'react';

import * as actions from '../../actions';
import Loading from '../reusable/loading/Loading';
import renderWithFallback from '../reusable/loading/renderWithFallback';

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
    if (user) {
      getCampaign();
      getEventCampaigns();
    }
  }, [getUserInfo, user, getCampaign, getEventCampaigns]);

  useEffect(() => {
    if (user?.firstName || error) {
      setLoading(false);
    }
  }, [user, error]);

  const renderNoChef = () => {
    if (!loading) {
      return (
        <div>
          <h3>You must be a CK Home Chef to access this page.</h3>
          <h3>If you are a Home Chef, sign in at the top of the page.</h3>
          <h3>
            If you want to become a Home Chef,{' '}
            <Link to="/forms/home-chef" className="retro-link">
              please complete the signup form.
            </Link>
          </h3>
          <h4>
            Once you submit the form, you will be invited to orientation and
            given a username.
          </h4>
          <Link to="../volunteers" className="retro-link">
            Other volunteer opportunities
          </Link>
        </div>
      );
    }
  };

  const renderHomeChef = () => {
    if (user?.homeChefStatus) {
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
      {renderHomeChef()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, error: state.error.error };
};

export default connect(mapStateToProps, actions)(HomeChef);
