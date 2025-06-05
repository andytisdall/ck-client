import { Outlet, Link } from "react-router-dom";
import { lazy } from "react";

import Loading from "../reusable/loading/Loading";
import renderWithFallback from "../reusable/loading/renderWithFallback";
import { useGetUserInfoQuery } from "../../state/apis/authApi";
import HomeChefStatus from "./HomeChefStatus";
import HomeChefNotSignedIn from "./HomeChefNotSignedIn";

const HomeChef = () => {
  const { data, isLoading } = useGetUserInfoQuery();
  const userInfo = data;

  const renderStatus = () => {
    if (userInfo?.homeChefStatus !== "Active") {
      return <HomeChefStatus />;
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
