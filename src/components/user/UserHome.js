import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { getRestaurant, getUserInfo } from '../../actions';

const UserHome = ({ user, restaurant, getRestaurant, getUserInfo }) => {
  useEffect(() => {
    getRestaurant();
    getUserInfo();
  }, [getRestaurant, getUserInfo]);

  const renderRestarant = () => {
    if (restaurant) {
      return <p>Your restaurant: {restaurant.name}</p>;
    }
  };

  const renderHomeChef = () => {
    const status = user.homeChefStatus ? 'Active' : 'Not Yet Active';
    if (user.homeChefStatus) {
      return <p>Your Home Chef Status: {status}</p>;
    }
  };

  return (
    <div>
      <div>
        <p>You are logged in as {user.username}</p>
        {renderRestarant()}
        {renderHomeChef()}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <Link className="text-button-link" to="change-password">
          Change Password
        </Link>
        <Link className="text-button-link" to="change-username" buttonText="">
          Change Username
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    restaurant: state.restaurant.restaurant,
  };
};

export default connect(mapStateToProps, { getRestaurant, getUserInfo })(
  UserHome
);
