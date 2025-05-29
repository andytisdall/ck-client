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
        <Link
          className="driver-onboarding-step driver-onboarding-incomplete"
          to={url}
        >
          {step}
        </Link>
      );
    }
    return (
      <div className="driver-onboarding-step driver-onboarding-complete">
        {step}
      </div>
    );
  };

  if (driver?.driverStatus === "Active") {
    return (
      <div>
        <h3>You are ready to sign up!</h3>
        <button onClick={() => navigate("../..")}>Continue</button>
      </div>
    );
  }

  console.log(driver);

  return (
    <div>
      <h3>
        You must complete onboarding to sign up for driver volunteer shifts.
      </h3>
      <div>
        <div className="driver-onboarding">
          {renderStepStatus(
            "Upload driver's license",
            !!driver.licenseExpiration,
            "license"
          )}

          {renderStepStatus(
            "Upload proof of insurance",
            !!driver.insuranceExpiration,
            "insurance"
          )}

          {renderStepStatus(
            "Enter info about your car",
            !!driver.car.size,
            "car"
          )}

          {renderStepStatus(
            "Sign the volunteer agreement",
            !!driver.volunteerAgreement,
            "sign/DRV"
          )}
        </div>
      </div>
      <div className="driver-btns">
        <Link to="/volunteers">
          <button className="cancel">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;
