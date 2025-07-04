import DriverSettings from "./DriverSettings";
import { useGetDriverQuery } from "../../../state/apis/volunteerApi/driver";
import Status, { Task } from "../../reusable/status/Status";

const Onboarding = () => {
  const { data: driver } = useGetDriverQuery();

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

  if (
    driver?.insuranceExpiration &&
    driver.licenseExpiration &&
    driver.car.size &&
    driver.volunteerAgreement
  ) {
    return <DriverSettings />;
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
