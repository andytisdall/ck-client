import { useState, FormEventHandler } from 'react';

import { useDispatch } from 'react-redux';

import './SignIn.css';
import Loading from '../reusable//loading/Loading';
import { useForgotPasswordMutation } from '../../state/apis/authApi';
import { setAlert } from '../../state/apis/slices/alertSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    forgotPassword(email)
      .unwrap()
      .then(() => {
        dispatch(
          setAlert('You will be emailed a link to reset your password.')
        );
        setEmail('');
      });
  };

  if (isLoading) {
    return (
      <div className="main user">
        <Loading />
      </div>
    );
  }

  return (
    <div className="main user">
      <form onSubmit={handleSubmit} className="signin">
        <div className="signin-fields">
          <label htmlFor="email">Enter your email address:</label>
          <input
            id="email"
            required
            name="email"
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signin-button">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
