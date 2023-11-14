import { useGetUserQuery } from '../state/apis/authApi';
import { useGetRestaurantQuery } from '../state/apis/mealProgramApi/restaurantApi';
import TextButton from './reusable/TextButton';
import './Home.css';

const volunteersDescription =
  'Sign up to volunteer as a Home Chef, help out in the CK Kitchen, or donate your time at special events.';

const mealProgramDescription =
  'A portal for restaurants participating in our meal program to complete the tasks necessary to start providing meals.';

const textServiceDescription =
  'An interface for sending out text message alerts, adding phone numbers to the subscriber lists and reviewing feedback received from users.';

const userDescription =
  'An area for users to see their information and to change their password or username.';

const adminDescription =
  'An interface for CK staff to create users or restaurants for this site.';

const Home = () => {
  const restaurantQuery = useGetRestaurantQuery();
  const restaurant = restaurantQuery.data;

  const userQuery = useGetUserQuery();
  const user = userQuery.data;

  const renderVolunteers = () => {
    return (
      <TextButton
        to="volunteers"
        buttonText="CK Volunteers"
        descriptionText={volunteersDescription}
      />
    );
  };

  const renderMealProgram = () => {
    if (restaurant) {
      return (
        <TextButton
          to="meal-program"
          buttonText="Restaurant Meal Program"
          descriptionText={mealProgramDescription}
        />
      );
    }
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
        {renderMealProgram()}
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
    <div className="home main">
      <h1>Home</h1>
      {user ? renderWithUser() : renderNoUser()}
    </div>
  );
};

export default Home;
