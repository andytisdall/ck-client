import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import Loading from '../reusable/Loading';
import * as actions from '../../actions';

const MealProgram = ({
  getRestaurant,
  restaurant,
  user,
  getMealProgramInfo,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (!restaurant) {
        getRestaurant();
      } else if (!restaurant.remainingDocs) {
        getMealProgramInfo();
      } else {
        setLoading(false);
      }
    }
  }, [restaurant, setLoading, getRestaurant, getMealProgramInfo, user]);

  const renderRestaurant = () => {
    const status = restaurant.status === 'Active' ? 'active' : 'inactive';
    return (
      <div className="meal-program-restaurant">
        <div className="meal-program-restaurant-section">
          <div>Your Restaurant:</div>
          <div className="meal-program-restaurant-name">{restaurant.name}</div>
        </div>
        <div className="meal-program-restaurant-section">
          <div>Status:</div>
          <div className={`meal-program-restaurant-status-${status}`}>
            {restaurant.status}
          </div>
        </div>
      </div>
    );
  };

  const renderSignIn = () => {
    return <h3>Sign in to access this page.</h3>;
  };

  return (
    <div className="main meal-program">
      <div className="meal-program-header">
        <Link to="/meal-program" className="meal-program-title">
          <h1 className="page-header">CK Meal Program</h1>
        </Link>
        {user && !loading && renderRestaurant()}
      </div>
      {user && loading && <Loading />}
      {user && !loading && <Outlet />}
      {!user && renderSignIn()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user, restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps, actions)(MealProgram);
