import { Outlet, Link } from 'react-router-dom';

import Loading from '../reusable/loading/Loading';
import {
  useGetRestaurantInfoQuery,
  useGetRestaurantQuery,
} from '../../state/apis/mealProgramApi';
import { useGetUserQuery } from '../../state/apis/authApi';

const MealProgram = () => {
  const restaurantInfoQuery = useGetRestaurantInfoQuery();
  const restaurantInfo = restaurantInfoQuery.data;

  const restaurantQuery = useGetRestaurantQuery();
  const restaurant = restaurantQuery.data;

  const userQuery = useGetUserQuery();
  const user = userQuery.data;

  const loading =
    restaurantInfoQuery.isLoading ||
    restaurantQuery.isLoading ||
    userQuery.isLoading;

  const renderRestaurant = () => {
    const status = restaurantInfo?.status === 'Active' ? 'active' : 'inactive';
    return (
      <div className="meal-program-restaurant">
        <div className="meal-program-restaurant-section">
          <div>Your Restaurant:</div>
          <div className="meal-program-restaurant-name">{restaurant?.name}</div>
        </div>
        <div className="meal-program-restaurant-section">
          <div>Status:</div>
          <div className={`meal-program-restaurant-status-${status}`}>
            {restaurantInfo?.status}
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

export default MealProgram;
