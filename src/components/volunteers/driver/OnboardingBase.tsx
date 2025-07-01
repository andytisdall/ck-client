import { Outlet, Link } from "react-router-dom";

import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import Loading from "../../reusable/loading/Loading";

const OnboardingBase = () => {
  const { data: driver, isFetching } = useGetDriverQuery();

  if (isFetching) {
    return <Loading />;
  }

  if (!driver) {
    return (
      <div className="driver-onboarding">
        <p>You must sign in to use this page.</p>
        <Link to="/volunteers">
          <button>Volunteers Home</button>
        </Link>
      </div>
    );
  }

  return <Outlet />;
};

export default OnboardingBase;
