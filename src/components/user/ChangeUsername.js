import { connect } from 'react-redux';
import { useState } from 'react';

import * as actions from '../../actions';

const ChangeUsername = ({ user, editUser }) => {
  const [username, setUsername] = useState(user.username);

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(user.id, username);
  };

  return (
    <div className="admin-item">
      <h2>Change Your Username</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label htmlFor="name">Username:</label>
        <input
          name="name"
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, actions)(ChangeUsername);
