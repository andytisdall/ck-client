import { useNavigate, Link } from "react-router-dom";

const DriverSignUp = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="vol-drivers">
        <h2>CK Delivery Driver Volunteers</h2>
        <div className="vol-driver-option">
          <Link
            className="text-button-link vol-driver-btn"
            to="https://my.careitapp.com/invite/mollye@ckoakland.org"
          >
            New Drivers
          </Link>
          <p>
            We use a website called CareIt to schedule food deliveries. This
            link will lead you to their website and prompt you to set up an
            account that will be associated with Community Kitchens. You will be
            asked to complete a short food safety lesson, followed by a quiz and
            the signing of a liability waiver. Please upload a copy of proof of
            insurance for the vehicle you will be using or email it to
            <a href="mailto:kenai@ckoakland.org"> kenai@ckoakland.org</a>. Once
            you have completed these steps, you'll be all set to begin picking
            up shifts!
          </p>
        </div>

        <div className="vol-driver-option">
          <Link
            className="text-button-link vol-driver-btn"
            to="https://my.careitapp.com/dashboard/available-runs"
          >
            Available Runs
          </Link>
          <p> See food runs that you can help us out with. </p>
        </div>
      </div>
      <button onClick={() => navigate("..")}>Back</button>
    </div>
  );
};

export default DriverSignUp;
