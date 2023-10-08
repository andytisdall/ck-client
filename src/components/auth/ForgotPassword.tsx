import { useState, FormEventHandler } from 'react';

import './SignIn.css';
import Loading from '../reusable//loading/Loading';
import { useForgotPasswordMutation } from '../../state/apis/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="signin-fields">
          <label htmlFor="email">Enter your email address:</label>
          <input
            id="email"
            required
            name="email"
            className="input"
            type="text"
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
