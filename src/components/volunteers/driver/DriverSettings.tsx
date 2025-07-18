import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import config from "../config";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";

const DriverSettings = () => {
  const { data: driver } = useGetDriverQuery();

  const navigate = useNavigate();

  const renderCar = () => {
    return (
      <li className="driver-settings">
        <h3>Your Vehicle:</h3>
        <div className="driver-settings-update">
          <ul>
            <li>
              <strong>Size:</strong> {driver?.car.size}
            </li>
            {driver?.car.size !== "Bike" && (
              <>
                <li>
                  <strong>Color:</strong> {driver?.car.color}
                </li>
                <li>
                  <strong>Make:</strong> {driver?.car.make}
                </li>
                <li>
                  <strong>Model:</strong> {driver?.car.model}
                </li>
                <li>
                  <strong>Year:</strong> {driver?.car.year}
                </li>
              </>
            )}
          </ul>
          <button onClick={() => navigate("car")}>Edit Vehicle Info</button>
        </div>
      </li>
    );
  };

  const renderInsurance = () => {
    if (driver?.insuranceExpiration) {
      const expired = new Date(driver.insuranceExpiration) < new Date();
      return (
        <li className="driver-settings">
          <h3>Insurance Expiration Date: </h3>
          <div className="driver-settings-update">
            <div
              className={`driver-settings-date ${expired ? "driver-settings-expired" : ""}`}
            >
              {format(new Date(driver.insuranceExpiration), "M/d/yy")}
            </div>
            <button onClick={() => navigate("insurance")}>
              Update Insurance
            </button>
          </div>
        </li>
      );
    }
  };

  const renderDriversLicense = () => {
    if (driver?.licenseExpiration) {
      const expired = new Date(driver.licenseExpiration) < new Date();

      return (
        <li className="driver-settings">
          <h3>Driver's License Expiration Date: </h3>
          <div className="driver-settings-update">
            <div
              className={`driver-settings-date ${expired ? "driver-settings-expired" : ""}`}
            >
              {format(new Date(driver.licenseExpiration), "M/d/yy")}
            </div>
            <button onClick={() => navigate("license")}>
              Update Driver's License
            </button>
          </div>
        </li>
      );
    }
  };

  const renderOnboarding = () => {
    return (
      <ul>
        {renderInsurance()}
        {renderDriversLicense()}
        {renderCar()}
      </ul>
    );
  };

  const renderStatus = () => {
    if (driver?.licenseExpiration && driver.insuranceExpiration) {
      const expired =
        new Date(driver.licenseExpiration) < new Date() ||
        new Date(driver.insuranceExpiration) < new Date();

      if (expired) {
        return (
          <div className="driver-settings-header">
            <h2>You must update your information</h2>
            <p>
              Some of your documents are out of date. Please update your info
              below.
            </p>
          </div>
        );
      }
      return (
        <div className="driver-settings-header">
          <h2>You are ready to transport meals!</h2>
          <button
            onClick={() => navigate(`../signup/${config.deliveryDrivers.id}`)}
          >
            Continue to Sign Up
          </button>
        </div>
      );
    }
  };

  return (
    <div className="driver-onboarding">
      {renderStatus()}
      {renderOnboarding()}
    </div>
  );
};

export default DriverSettings;
