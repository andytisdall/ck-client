import { Link } from "react-router-dom";

const AppInfo = () => {
  return (
    <div className="volunteers-shift-detail driver-app-info">
      <img
        src="/images/volunteers/phone-icon.png"
        alt="phone"
        className="driver-app-phone-icon"
      />
      <div className="driver-app-text">
        <h4>Announce your delivery with the CK Text Service</h4>
        <p>
          Use our mobile app to send a text message to our list of subscribers
          and let them know about the available meals.
        </p>
        <p>
          <Link to="/home-chef-app" className="retro-link">
            Click here to download the app
          </Link>
        </p>
        <p>OR</p>
        <p>Scan the code below to download the app on your phone.</p>
        <img
          src="/images/volunteers/home-chef-app-qr-code.png"
          alt="qr code"
          className="driver-app-qr-code"
        />
      </div>
    </div>
  );
};

export default AppInfo;
