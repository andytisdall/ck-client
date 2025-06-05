import { useState, FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setError } from "../../state/apis/slices/errorSlice";
import { useGetUserQuery, useEditUserMutation } from "../../state/apis/authApi";
import { setAlert } from "../../state/apis/slices/alertSlice";
import Loading from "../reusable/loading/Loading";

const ChangePassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const user = useGetUserQuery().data;
  const [editUser, { isLoading }] = useEditUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (user) {
      if (password1 !== password2) {
        return dispatch(setError({ message: "Passwords do not match" }));
      }
      editUser({
        userId: user.id,
        username: user.username,
        password: password1,
        salesforceId: user.salesforceId,
      })
        .unwrap()
        .then(() => {
          dispatch(setAlert("You have changed your password"));
          navigate("/");
        });
      setPassword1("");
      setPassword2("");
    }
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
        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </div>
  );
};

export default ChangePassword;
