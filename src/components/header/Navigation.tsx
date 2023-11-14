import { Link } from 'react-router-dom';

import './Navigation.css';
import { useGetRestaurantQuery } from '../../state/apis/mealProgramApi';
import { useGetUserQuery } from '../../state/apis/authApi';

const Navigation = () => {
  const restaurantQuery = useGetRestaurantQuery();
  const restaurant = restaurantQuery.data;

  const userQuery = useGetUserQuery();
  const user = userQuery.data;

  const NavButton = ({ to, text }: { to: string; text: string }) => {
    return (
      <Link className="nav-btn" to={to}>
        {text}
      </Link>
    );
  };

  const renderVolunteers = () => {
    return <NavButton to="volunteers" text="CK Volunteers" />;
  };

  const renderMealProgram = () => {
    if (restaurant) {
      return <NavButton to="meal-program" text="Restaurant Meal Program" />;
    }
  };

  const renderTextService = () => {
    if (user?.admin) {
      return <NavButton to="text" text="Text Service" />;
    }
  };

  const renderAdmin = () => {
    if (user?.admin) {
      return <NavButton to="admin" text="Admin" />;
    }
  };

  const renderNoUser = () => {
    return <div className="nav-btns">{renderVolunteers()}</div>;
  };

  const renderWithUser = () => {
    return (
      <div className="nav-btns">
        {renderMealProgram()}
        {renderTextService()}
        {renderVolunteers()}
        <NavButton to="user" text="User Settings" />
        {renderAdmin()}
      </div>
    );
  };

  return <nav>{user ? renderWithUser() : renderNoUser()}</nav>;
};

export default Navigation;
