import { connect } from 'react-redux';
import { useState } from 'react';

import * as actions from '../../actions';

const ChangePassword = ({ user, editUser, setError }) => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return setError({ message: 'Passwords do not match' });
    }
    editUser(user.id, user.username, password1);
    setPassword1('');
    setPassword2('');
  };

  return (
    <div className="admin-item">
      <h2>Change Your Password</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label htmlFor="password1">New Password:</label>
        <input
          name="password1"
          type="password"
          value={password1}
          required
          onChange={(e) => setPassword1(e.target.value)}
        />
        <label htmlFor="user">Re-Enter Password:</label>
        <input
          required
          type="password"
          value={password2}
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, actions)(ChangePassword);
