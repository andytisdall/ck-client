import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { getRestaurant } from '../../actions';

const UserHome = ({ user, restaurant, getRestaurant }) => {
  useEffect(() => {
    getRestaurant();
  }, [getRestaurant]);

  return (
    <div>
      <div>
        <p>You are logged in as {user.username}</p>
        <p>Your restaurant: {restaurant?.name || 'None'}</p>
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

export default connect(mapStateToProps, { getRestaurant })(UserHome);
