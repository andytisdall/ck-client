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
    text: "Enter info about your vehicle",
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
      <img
        src="/images/volunteers/drivers/driver-onboarding.jpg"
        alt="CK Driver Volunteers"
        className="driver-onboarding-home"
      />
      <div className="driver-onboarding-text">
        <p>
          Thank you for volunteering to support pickups and deliveries with
          Community Kitchens! It takes many hands to get nutritious food out to
          our community, and we truly appreciate you being part of the effort.
          Here are a few examples of delivery volunteer roles:
        </p>
        <ul>
          <li>
            Picking up donated food and bringing it to the CK Kitchen (2270
            Telegraph Ave, Oakland)
          </li>
          <li>Delivering meals from the CK Kitchen to Town Fridges</li>
          <li>Distributing meals by bike to our unhoused neighbors</li>
        </ul>
        <p>
          If you have any questions about the delivery program, please reach out
          to Kenai at{" "}
          <a href="mailto:kenai@ckoakland.org" className="retro-link">
            kenai@ckoakland.org
          </a>
          . For technical support, contact Andy at{" "}
          <a href="mailto:andy@ckoakland.org" className="retro-link">
            andy@ckoakland.org
          </a>
          . Thanks again for being part of the team!
        </p>
        <p>— Community Kitchens</p>
      </div>
      <Status tasks={tasks}>
        <div>
          <strong>
            You must complete onboarding to sign up for driver volunteer shifts.
            Click on a task to start.
          </strong>
        </div>
      </Status>
    </div>
  );
};

export default Onboarding;
