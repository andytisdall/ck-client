import { Link } from 'react-router-dom';

import { useGetRestaurantQuery } from '../../state/apis/mealProgramApi/restaurantApi';
import { useGetUserInfoQuery, useGetUserQuery } from '../../state/apis/authApi';

const UserHome = () => {
  const restaurant = useGetRestaurantQuery().data;
  const userInfo = useGetUserInfoQuery().data;
  const user = useGetUserQuery().data;

  const renderRestarant = () => {
    if (restaurant) {
      return <p>Your restaurant: {restaurant.name}</p>;
    }
  };

  const renderHomeChef = () => {
    const status = userInfo?.homeChefStatus ? 'Active' : 'Not Yet Active';
    if (userInfo?.homeChefStatus) {
      return <p>Your Home Chef Status: {status}</p>;
    }
  };

  return (
    <div>
      <div>
        <p>You are logged in as {user?.username}</p>
        {renderRestarant()}
        {renderHomeChef()}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <Link className="text-button-link" to="change-password">
          Change Password
        </Link>
        <Link className="text-button-link" to="change-username">
          Change Username
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
