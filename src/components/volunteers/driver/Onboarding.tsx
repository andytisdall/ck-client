import { useNavigate } from "react-router-dom";

import "./Driver.css";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import Loading from "../../reusable/loading/Loading";
import Status, { Task } from "../../reusable/status/Status";
import config from "./config";

const Onboarding = () => {
  const { data: driver, isLoading } = useGetDriverQuery();

  const navigate = useNavigate();

  const driversLicense: Task = {
    text: "Upload driver's license",
    completed: !!driver?.licenseExpiration,
    url: "license",
  };

  const insurance: Task = {
    text: "Upload proof of insurance",
    completed: !!driver?.insuranceExpiration,
    url: "insurance",
  };

  const car: Task = {
    text: "Enter info about your car",
    completed: !!driver?.car.size,
    url: "car",
  };

  const volunteerAgreement = {
    text: "Sign the volunteer agreement",
    completed: !!driver?.volunteerAgreement,
    url: "sign/DRV",
  };
  const tasks = [driversLicense, insurance, car, volunteerAgreement];

  if (isLoading) {
    return <Loading />;
  }

  if (!driver) {
    return <div>Driver not found.</div>;
  }
  if (driver?.driverStatus === "Active") {
    return (
      <div className="driver-onboarding">
        <h3>You are ready to sign up for driving volunteer shifts!</h3>
        <button
          onClick={() => navigate(`../signup/${config.driverCampaignId}`)}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="driver-onboarding">
      <Status tasks={tasks}>
        <div>
          You must complete onboarding to sign up for driver volunteer shifts.
        </div>
      </Status>
    </div>
  );
};

export default Onboarding;
