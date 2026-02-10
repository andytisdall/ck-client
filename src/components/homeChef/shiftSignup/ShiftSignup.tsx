import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";

import { navLink } from "../../../utils/style";
import "./ShiftSignup.css";
import {
  useGetUserInfoQuery,
  useGetUserQuery,
} from "../../../state/apis/authApi";

const ShiftSignup = () => {
  const userInfo = useGetUserInfoQuery().data;
  const { data: user } = useGetUserQuery();

  const navigate = useNavigate();

  const renderInactive = () => {
    return (
      <div>
        <Link to="../onboarding" className="retro-link">
          You must finish the onboarding process before you can sign up for Home
          Chef deliveries.
        </Link>
      </div>
    );
  };

  const renderSignup = () => {
    if (!userInfo?.homeChefSurveyCompleted && !user?.admin) {
      return (
        <div className="shift-signup-header home-chef-survey">
          <div>
            <h3>
              Please take a short survey so that CK can improve the Home Chef
              experience
            </h3>
          </div>
          <div>
            <button onClick={() => navigate("../survey")}>Take Survey</button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="shift-signup-header">
          <h1>Town Fridge Sign Up</h1>
          <div className="shift-signup-links">
            <NavLink to="list" className={navLink}>
              List View
            </NavLink>
            <NavLink to="calendar" className={navLink}>
              Calendar View
            </NavLink>
          </div>
        </div>
        <Outlet />
      </>
    );
  };

  const renderContent = () => {
    if (!userInfo || userInfo.homeChefStatus !== "Active") {
      return renderInactive();
    }
    return renderSignup();
  };

  return <div className="shift-signup">{renderContent()}</div>;
};

export default ShiftSignup;
