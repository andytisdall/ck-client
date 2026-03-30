import { useState, FormEventHandler } from "react";

import "./SignedOut/SignIn.css";
import Loading from "../reusable//loading/Loading";
import { useForgotPasswordMutation } from "../../state/apis/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await forgotPassword(email).unwrap();
  };

  if (isLoading) {
    return (
      <div className="main user">
        <Loading />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="main user">
        <p>You will be emailed a link to reset your password.</p>
      </div>
    );
  }

  return (
    <div className="main user">
      <h3>Forgot Your Password?</h3>

      <form onSubmit={handleSubmit}>
        <div className="signin-fields">
          <label htmlFor="email">
            Enter your email address below and we'll send you a link to reset
            your password:
          </label>
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
