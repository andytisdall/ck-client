import { useGetUserQuery } from "../state/apis/authApi";
import TextButton from "./reusable/TextButton";
import "./Home.css";

const volunteersDescription =
  "Sign up to volunteer as a Home Chef, help out in the CK Kitchen, or donate your time at special events.";

const textServiceDescription =
  "An interface for sending out text message alerts, adding phone numbers to the subscriber lists and reviewing feedback received from users.";

const userDescription =
  "An area for users to see their information and to change their password or username.";

const adminDescription =
  "An interface for CK staff to create users or restaurants for this site.";

const Home = () => {
  const { data: user } = useGetUserQuery();

  const renderVolunteers = () => {
    return (
      <TextButton
        to="volunteers"
        buttonText="CK Volunteers"
        descriptionText={volunteersDescription}
      />
    );
  };

  const renderTextService = () => {
    if (user?.admin) {
      return (
        <TextButton
          to="text"
          buttonText="Text Service"
          descriptionText={textServiceDescription}
        />
      );
    }
  };

  const renderAdmin = () => {
    if (user?.admin) {
      return (
        <TextButton
          to="admin"
          buttonText="Admin"
          descriptionText={adminDescription}
        />
      );
    }
  };

  const renderNoUser = () => {
    return <>{renderVolunteers()}</>;
  };

  const renderWithUser = () => {
    return (
      <>
        {renderTextService()}
        {renderVolunteers()}
        <TextButton
          to="user"
          buttonText="User Settings"
          descriptionText={userDescription}
        />
        {renderAdmin()}
      </>
    );
  };

  return (
    <div className="home main">{user ? renderWithUser() : renderNoUser()}</div>
  );
};

export default Home;
