import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import SignInAsUser from "./SignInAsUser";

const User = () => {
  return (
    <div className="create-main">
      <CreateUser />
      <EditUser />
      <DeleteUser />
      <SignInAsUser />
    </div>
  );
};

export default User;
