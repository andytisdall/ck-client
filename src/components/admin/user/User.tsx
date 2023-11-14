import EditUser from './EditUser';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import D4JFile from './D4JFile';

const User = () => {
  return (
    <div className="create-main">
      <CreateUser />
      <EditUser />
      <DeleteUser />
      <D4JFile />
    </div>
  );
};

export default User;
