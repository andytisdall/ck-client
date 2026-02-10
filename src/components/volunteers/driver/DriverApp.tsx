import "../../homeChef/HomeChefApp.css";
import "./Driver.css";

const DriverApp = () => {
  return (
    <div className="driver-onboarding driver-app">
      <h2>The CK Home Chef / Delivery Driver app</h2>
      <div>
        When delivering meals to Town Fridges, please send a text alert using
        our mobile app.
      </div>
      <div className="driver-app-container">
        <div className="driver-app-gif">
          <img src="/images/volunteers/driver-app.gif" alt="CK driver app" />
        </div>
        <div className="driver-app-text">
          Sign in with your CK Portal username and password, navigate to "Text,"
          and enter the details of your delivery into the interface. The app
          will send the message to people who have subscribed to be alerted when
          a Town Fridge is stocked.
        </div>
      </div>
      <h3>Download the CK App:</h3>

      <div className="home-chef-app-links">
        <a
          href="https://apps.apple.com/us/app/ck-home-chef/id6457099267"
          className="home-chef-app-logos home-chef-app-apple"
          target="blank"
        >
          <img src="/images/logos/apple-logo.png" alt="Apple Logo" />
          Apple
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.ckhomechefapp"
          className="home-chef-app-logos home-chef-app-android"
          target="blank"
        >
          <img src="/images/logos/google-logo.png" alt="Google Logo" />
          Android
        </a>
        <div className="home-chef-app-logos home-chef-app-android">
          <img
            src="/images/volunteers/home-chef-app-qr-code.png"
            alt="qr code"
            className="driver-app-qr-code"
          />
          Scan
        </div>
      </div>
    </div>
  );
};

export default DriverApp;
