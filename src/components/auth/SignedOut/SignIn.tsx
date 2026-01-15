import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";
import Loading from "../../reusable/loading/Loading";
import { useSignInMutation } from "../../../state/apis/authApi";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, signInResult] = useSignInMutation();

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn({ username, password })
      .unwrap()
      .then((user) => {
        if (!user.active) {
          navigate("/user/change-password");
        }
      });
  };

  if (signInResult.isLoading) {
    return <Loading />;
  }

  return (
    <form className="signin" onSubmit={handleSubmit}>
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
          required
        />
        <input
          name="password"
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

export default SignIn;
