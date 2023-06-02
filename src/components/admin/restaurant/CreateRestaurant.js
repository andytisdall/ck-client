import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { getAllUsers, createRestaurant } from '../../../actions';

const CreateRestaurant = ({ users, getAllUsers, createRestaurant }) => {
  const [name, setName] = useState('');
  const [salesforceId, setSalesforceId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createRestaurant(name, salesforceId, userId);
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
          {users
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

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.user.users),
  };
};

export default connect(mapStateToProps, { getAllUsers, createRestaurant })(
  CreateRestaurant
);
