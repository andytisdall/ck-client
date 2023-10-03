import { FormEventHandler, useState } from 'react';

import './SignIn.css';
import Loading from '../reusable/loading/Loading';
import { useSignInMutation } from '../../state/apis/authApi';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, signInResult] = useSignInMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn({ username, password });
  };

  if (signInResult.isLoading) {
    return <Loading />;
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <div className="signin-button">
          <div className="signin-title">Sign In</div>
          <input type="submit" value="Submit" />
        </div>
        <div className="signin-fields">
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
