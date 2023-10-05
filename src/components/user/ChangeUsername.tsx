import { useState, FormEventHandler } from 'react';

import { useGetUserQuery, useEditUserMutation } from '../../state/apis/authApi';

const ChangeUsername = () => {
  const user = useGetUserQuery().data;
  const [editUser] = useEditUserMutation();

  const [username, setUsername] = useState(user?.username || '');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (user && username) {
      editUser({ userId: user.id, username: username });
    }
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ChangeUsername;
