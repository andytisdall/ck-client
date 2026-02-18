import "../../homeChef/HomeChefApp.css";
import "./Driver.css";

const DriverApp = () => {
  const insructions = (
    <div>
      <ol className="driver-app-text">
        <div>
          <img
            src="/images/volunteers/drivers/signin.jpg"
            alt="signin page"
            className="driver-app-instructions-photo"
          />
          <li>Sign in with your CK Portal username and password</li>
        </div>
        <div>
          <img
            src="/images/volunteers/drivers/home.jpg"
            alt="signin page"
            className="driver-app-instructions-photo"
          />
          <li>Navigate to "Text"</li>
        </div>
        <div>
          <img
            src="/images/volunteers/drivers/mealname.jpg"
            alt="signin page"
            className="driver-app-instructions-photo"
          />
          <li>
            Look at the label on the meal to get all information prompted in the
            app (Meal Provider, Name of Meal, # of Meals)
          </li>
        </div>
        <div>
          <img
            src="/images/volunteers/drivers/fridges.jpg"
            alt="signin page"
            className="driver-app-instructions-photo"
          />
          <li>Select the Town Fridge you are at</li>
        </div>
        <div>
          <img
            src="/images/volunteers/drivers/photo.jpg"
            alt="signin page"
            className="driver-app-instructions-photo"
          />
          <li>
            Take an appetizing photo of the meal (you can remove the lid) and
            upload it.
          </li>
        </div>
        <div>
          <img
            src="/images/volunteers/drivers/confirm.jpg"
            alt="signin page"
            className="driver-app-instructions-photo"
          />
          <li>Confirm your message is correct and press "Send"</li>
        </div>
        <div>
          <img
            src="/images/volunteers/drivers/text.jpg"
            alt="signin page"
            className="driver-app-instructions-photo"
          />
          <li>
            The app will send the message to people who have subscribed to be
            alerted when a Town Fridge is stocked.
          </li>
        </div>
      </ol>
    </div>
  );
  return (
    <div className="driver-app">
      <h2>The CK Home Chef / Delivery Driver app</h2>
      <div>
        When delivering meals to Town Fridges, please send a text alert using
        our mobile app.
      </div>
      {insructions}
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
