import { useState, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import { useGetAllUsersQuery, User } from '../../../state/apis/authApi';
import { useCreateRestaurantMutation } from '../../../state/apis/mealProgramApi/restaurantApi';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [salesforceId, setSalesforceId] = useState('');
  const [userId, setUserId] = useState('');

  const users = useGetAllUsersQuery().data;
  const [createRestaurant] = useCreateRestaurantMutation();

  const dispatch = useDispatch();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    createRestaurant({ name, salesforceId, userId }).then(() =>
      dispatch(setAlert('Restaurant Created'))
    );
    setName('');
    setSalesforceId('');
    setUserId('');
  };

  return (
    <div className="admin-item">
      <h2>Create a Restaurant</h2>
      <form onSubmit={handleSubmit} className="admin-form">
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
              .sort((a: User, b: User) => (a.username > b.username ? 1 : -1))
              .map((u: User) => {
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

export default CreateRestaurant;
