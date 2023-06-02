import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import * as actions from '../../../actions';

const DeleteUser = ({ deleteUser, users, getAllUsers }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleSubmit = () => {
    if (user && window.confirm(`Seriously delete ${user.username}`)) {
      deleteUser(user.id);
      setUser('');
    }
  };

  const renderUsers = () => {
    return Object.values(users)
      .filter((u) => !u.admin)
      .sort((a, b) => (a.username > b.username ? 1 : -1))
      .map((u) => {
        return (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        );
      });
  };

  const onUserSelect = (e) => {
    const usr = users[e.target.value];
    if (usr) {
      setUser(usr);
    } else {
      setUser('');
    }
  };

  const showUserDetails = () => {
    return (
      <div className="admin-delete-user">
        {Object.keys(user).map((key) => {
          return (
            <p key={key}>
              {key}: {user[key].toString()}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="admin-item">
      <h2>Delete a User</h2>
      <div onSubmit={handleSubmit} className="admin-form">
        <select required name="user" value={user.id} onChange={onUserSelect}>
          <option value="">Select a User</option>
          {renderUsers()}
        </select>
        {user ? showUserDetails() : null}
        <button className="cancel" onClick={handleSubmit}>
          Delete User
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
  };
};

export default connect(mapStateToProps, actions)(DeleteUser);
