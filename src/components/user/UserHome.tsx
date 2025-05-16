import { Link } from "react-router-dom";

import { useGetUserInfoQuery, useGetUserQuery } from "../../state/apis/authApi";

const UserHome = () => {
  const userInfo = useGetUserInfoQuery().data;
  const user = useGetUserQuery().data;

  const renderHomeChef = () => {
    const status =
      userInfo?.homeChefStatus === "Active" ? "Active" : "Not Yet Active";
    if (userInfo?.homeChefStatus) {
      return <p>Your Home Chef Status: {status}</p>;
    }
  };

  return (
    <div>
      <div>
        <p>You are logged in as {user?.username}</p>
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
