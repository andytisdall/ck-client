import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { getAllUsers, editRestaurant, getAllRestaurants } from '../../actions';

const EditRestaurant = ({
  users,
  restaurants,
  getAllUsers,
  editRestaurant,
  getAllRestaurants,
}) => {
  const [restaurant, setRestaurant] = useState('');
  const [name, setName] = useState('');
  const [salesforceId, setSalesforceId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getAllUsers();
    getAllRestaurants();
  }, [getAllUsers, getAllRestaurants]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editRestaurant(restaurant, name, salesforceId, userId);
    setRestaurant('');
    setName('');
    setSalesforceId('');
    setUserId('');
  };

  const renderRestaurants = () => {
    return Object.values(restaurants).map((u) => {
      return (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      );
    });
  };

  const onRestaurantSelect = (e) => {
    setRestaurant(e.target.value);
    const rest = restaurants[e.target.value];
    if (rest) {
      setName(rest.name);
      setSalesforceId(rest.salesforceId);
      setUserId(rest.user);
    } else {
      setRestaurant('');
      setName('');
      setSalesforceId('');
      setUserId('');
    }
  };

  return (
    <div className="admin-item">
      <h2>Edit a Restaurant</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <select
          name="restaurant"
          value={restaurant}
          onChange={onRestaurantSelect}
        >
          <option value="">Select a Restaurant</option>
          {renderRestaurants()}
        </select>
        <label htmlFor="name">Restaurant Name:</label>
        <input
          name="name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="SFID">Salesforce ID:</label>
        <input
          name="SFID"
          type="text"
          value={salesforceId}
          required
          onChange={(e) => setSalesforceId(e.target.value)}
        />
        <label htmlFor="user">User:</label>
        <select
          required
          value={userId}
          name="user"
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select a User</option>
          {Object.values(users).map((u) => {
            return (
              <option value={u.id} key={u.id}>
                {u.username}
              </option>
            );
          })}
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    restaurants: state.restaurant.restaurants,
  };
};

export default connect(mapStateToProps, {
  getAllUsers,
  editRestaurant,
  getAllRestaurants,
})(EditRestaurant);
