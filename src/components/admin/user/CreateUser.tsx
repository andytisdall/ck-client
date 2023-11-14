import { useState, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import { useCreateUserMutation } from '../../../state/apis/authApi/userApi';
import { setError } from '../../../state/apis/slices/errorSlice';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [salesforceId, setSalesforceId] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return dispatch(setError('Passwords do not match'));
    }
    createUser({ username, password: password1, salesforceId })
      .unwrap()
      .then(() => {
        dispatch(setAlert('User Created'));
      });
    setUsername('');
    setSalesforceId('');
    setPassword1('');
    setPassword2('');
  };

  return (
    <div className="admin-item">
      <h2>Create a User</h2>
      <form onSubmit={handleSubmit} className="admin-form">
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

export default CreateUser;
