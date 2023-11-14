import { useParams, Link } from 'react-router-dom';
import { useState, FormEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import { useResetPasswordMutation } from '../../state/apis/authApi';
import { setError } from '../../state/apis/slices/errorSlice';
import Loading from '../reusable/loading/Loading';
import './User.css';

const ResetPassword = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const { token } = useParams();

  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();

  const dispatch = useDispatch();

  if (!token) {
    return <div>Invalid URL.</div>;
  }

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return dispatch(setError('Passwords do not match'));
    }
    resetPassword({ password: password1, token });
  };

  if (resetPasswordResult.isSuccess) {
    return (
      <div className="main user">
        <p>You successfully reset your password.</p>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="main user">
      <form onSubmit={onSubmit} className="admin-form">
        <label htmlFor="password1">New Password:</label>
        <input
          type="password"
          id="password1"
          value={password1}
          required
          onChange={(e) => setPassword1(e.target.value)}
        />
        <label htmlFor="password1">Re-enter Password:</label>
        <input
          type="password"
          id="password2"
          required
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {resetPasswordResult.isLoading ? <Loading /> : <input type="submit" />}
      </form>
    </div>
  );
};

export default ResetPassword;
