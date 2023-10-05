import { useState, FormEventHandler, ChangeEventHandler } from 'react';

import {
  useEditRestaurantMutation,
  useGetAllRestaurantsQuery,
} from '../../../state/apis/restaurantApi';
import { useGetAllUsersQuery } from '../../../state/apis/authApi';

const EditRestaurant = () => {
  const [restaurant, setRestaurant] = useState('');
  const [name, setName] = useState('');
  const [salesforceId, setSalesforceId] = useState('');
  const [userId, setUserId] = useState('');

  const [editRestaurant] = useEditRestaurantMutation();
  const restaurants = useGetAllRestaurantsQuery().data;
  const users = useGetAllUsersQuery().data;

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    editRestaurant({ restaurantId: restaurant, name, salesforceId, userId });
    setRestaurant('');
    setName('');
    setSalesforceId('');
    setUserId('');
  };

  const renderRestaurants = () => {
    if (restaurants) {
      return Object.values(restaurants).map((u) => {
        return (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        );
      });
    }
  };

  const onRestaurantSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setRestaurant(e.target.value);
    if (restaurants) {
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
          {!!users &&
            Object.values(users)
              .sort((a, b) => (a.username > b.username ? 1 : -1))
              .map((u) => {
                return (
                  <option value={u.id} key={u.id}>
                    {u.username}
                  </option>
                );
              })}
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditRestaurant;
