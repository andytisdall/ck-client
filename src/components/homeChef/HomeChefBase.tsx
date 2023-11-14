import { Outlet, Link } from 'react-router-dom';
import { lazy } from 'react';

import Loading from '../reusable/loading/Loading';
import renderWithFallback from '../reusable/loading/renderWithFallback';
import { useGetUserInfoQuery } from '../../state/apis/authApi';

const HomeChefStatus = lazy(() => import('./HomeChefStatus'));

const HomeChef = () => {
  const { data, isLoading } = useGetUserInfoQuery();
  const userInfo = data;

  const renderNoChef = () => {
    if (!isLoading) {
      return (
        <div>
          <h3>You must be a CK Home Chef to access this page.</h3>
          <h3>If you are a Home Chef, sign in at the top of the page.</h3>
          <h3>
            If you want to become a Home Chef,{' '}
            <Link to="/forms/volunteer" className="retro-link">
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
    if (userInfo?.homeChefStatus) {
      return (
        <>
          {userInfo.homeChefStatus !== 'Active' &&
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
      {isLoading && <Loading />}
      {renderHomeChef()}
    </div>
  );
};

export default HomeChef;
