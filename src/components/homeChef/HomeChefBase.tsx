import { Outlet, Link } from "react-router-dom";
import { lazy } from "react";

import Loading from "../reusable/loading/Loading";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import { useGetUserInfoQuery } from "../../state/apis/authApi";

const HomeChefNotSignedIn = lazy(() => import("./HomeChefNotSignedIn"));
const HomeChefStatus = lazy(() => import("./HomeChefStatus"));

const HomeChef = () => {
  const { data: userInfo, isLoading } = useGetUserInfoQuery();

  const renderStatus = () => {
    if (userInfo?.homeChefStatus !== "Active") {
      return renderWithFallback(<HomeChefStatus />);
    }
  };

  const renderHomeChef = () => {
    if (userInfo?.homeChefStatus) {
      return (
        <>
          {renderStatus()}
          <Outlet />
        </>
      );
    } else {
      return renderWithFallback(<HomeChefNotSignedIn />);
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
      {isLoading ? <Loading /> : renderHomeChef()}
    </div>
  );
};

export default HomeChef;
