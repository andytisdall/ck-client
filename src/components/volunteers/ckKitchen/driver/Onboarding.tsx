import { Link, useNavigate } from "react-router-dom";

import { useGetDriverQuery } from "../../../../state/apis/volunteerApi/driver";
import Loading from "../../../reusable/loading/Loading";

const Onboarding = () => {
  const { data: driver, isLoading } = useGetDriverQuery();

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (!driver) {
    return <h5>Driver not found.</h5>;
  }

  const renderStepStatus = (
    step: string,
    stepCompleted: boolean,
    url: string
  ) => {
    if (!stepCompleted) {
      return (
        <Link to={url}>
          <li className="driver-onboarding-incomplete">{step}</li>
        </Link>
      );
    }
    return <li className="driver-onboarding-complete">{step}</li>;
  };

  if (driver?.driverStatus === "Active") {
    return (
      <div>
        <h3>You are ready to sign up!</h3>
        <button onClick={() => navigate("..")}>Continue</button>
      </div>
    );
  }

  return (
    <div>
      <h3>
        You must complete onboarding to sign up for driver volunteer shifts.
      </h3>
      <div>
        <ul className="driver-onboarding">
          {renderStepStatus(
            "Upload driver's license",
            !!driver.licenseExpiration,
            "license"
          )}

          {renderStepStatus("Enter info about your car", !!driver.car, "car")}

          {renderStepStatus(
            "Sign the volunteer agreement",
            !!driver.volunteerAgreement,
            "sign/DRV"
          )}
        </ul>
      </div>
    </div>
  );
};

export default Onboarding;
