import { useState, FormEventHandler, ChangeEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import {
  useEditUserMutation,
  useGetAllUsersQuery,
} from '../../../state/apis/authApi';
import { setError } from '../../../state/apis/slices/errorSlice';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const EditUser = () => {
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [salesforceId, setSalesforceId] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const dispatch = useDispatch();
  const [editUser] = useEditUserMutation();
  const users = useGetAllUsersQuery().data;

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return dispatch(setError('Passwords do not match'));
    }
    editUser({
      userId: user,
      username,
      password: password1,
      salesforceId,
    }).then(() => {
      dispatch(setAlert('User Edited'));
      setUser('');
      setUsername('');
      setSalesforceId('');
      setPassword1('');
      setPassword2('');
    });
  };

  const renderUsers = () => {
    if (users) {
      return Object.values(users)
        .sort((a, b) => (a.username > b.username ? 1 : -1))
        .map((u) => {
          return (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          );
        });
    }
  };

  const onUserSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (users) {
      const usr = users[e.target.value];
      if (usr) {
        setUser(usr.id);
        setUsername(usr.username);
        setSalesforceId(usr.salesforceId);
      } else {
        setUser('');
        setUsername('');
        setSalesforceId('');
        setPassword1('');
        setPassword2('');
      }
    }
  };

  return (
    <div className="admin-item">
      <h2>Edit a User</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <select required name="user" value={user} onChange={onUserSelect}>
          <option value="">Select a User</option>
          {renderUsers()}
        </select>
        {!!user && <div className="admin-id-text">ID: {user}</div>}
        <label htmlFor="name">Username:</label>
        <input
          name="name"
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="salesforceId">Salesforce ID:</label>
        <input
          name="salesforceId"
          type="text"
          value={salesforceId}
          onChange={(e) => setSalesforceId(e.target.value)}
        />
        <label htmlFor="password1">Password:</label>
        <input
          name="password1"
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <label htmlFor="user">Re-Enter Password:</label>
        <input
          type="password"
          value={password2}
          name="password2"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default EditUser;
