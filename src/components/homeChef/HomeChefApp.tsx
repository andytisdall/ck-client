import "./HomeChefApp.css";
import "./HomeChef.css";

const HomeChefApp = () => {
  return (
    <div className="main home-chef">
      <h2>Download the Home Chef App</h2>
      <h4>
        Sign up for deliveries and send alerts about your Town Fridge deliveries
        from your mobile device. Works on all Apple and Android devices.
      </h4>
      <div className="home-chef-app-links">
        <a
          href="https://apps.apple.com/us/app/ck-home-chef/id6457099267"
          className="home-chef-app-logos home-chef-app-apple"
          target="blank"
        >
          <img src="/images/logos/apple-logo.png" alt="Apple Logo" />
          Apple App
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.ckhomechefapp"
          className="home-chef-app-logos home-chef-app-android"
          target="blank"
        >
          <img src="/images/logos/google-logo.png" alt="Google Logo" />
          Android App
        </a>
      </div>
    </div>
  );
};

export default HomeChefApp;
