import { Link } from "react-router-dom";

import Loading from "../reusable/loading/Loading";
import { useGetUserInfoQuery, useGetUserQuery } from "../../state/apis/authApi";

const UserHome = () => {
  const userInfo = useGetUserInfoQuery().data;
  const { data: user, isLoading } = useGetUserQuery();

  const renderHomeChef = () => {
    const status =
      userInfo?.homeChefStatus === "Active" ? "Active" : "Not Yet Active";
    if (userInfo?.homeChefStatus) {
      return (
        <p>
          Your Home Chef Status: <strong>{status}</strong>
        </p>
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div>
      <div>
        <p>
          You are logged in as <strong>{user.username}</strong>
        </p>
        {renderHomeChef()}
      </div>
      <div style={{ marginTop: "2rem", display: "flex" }}>
        <Link className="text-button-link" to="change-password">
          Change Password
        </Link>
        <Link className="text-button-link" to="change-username">
          Change Username
        </Link>
      </div>
    </div>
  );
};

export default UserHome;
