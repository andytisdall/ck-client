import EditUser from './EditUser';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';

const User = () => {
  return (
    <div className="create-main">
      <CreateUser />
      <EditUser />
      <DeleteUser />
    </div>
  );
};

export default User;
