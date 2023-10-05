import { useState, ChangeEventHandler } from 'react';

import {
  User,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../../state/apis/authApi';

const DeleteUser = () => {
  const [user, setUser] = useState<User>();

  const users = useGetAllUsersQuery().data;
  const [deleteUser] = useDeleteUserMutation();

  const handleSubmit = () => {
    if (user && window.confirm(`Seriously delete ${user.username}`)) {
      deleteUser(user.id);
      setUser(undefined);
    }
  };

  const renderUsers = () => {
    if (users) {
      return Object.values(users)
        .filter((u) => !u.admin)
        .sort((a, b) => (a.username > b.username ? 1 : -1))
        .map((u) => {
          return (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          );
        });
    }
  };

  const onUserSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (users) {
      const usr = users[e.target.value];
      if (usr) {
        setUser(usr);
      } else {
        setUser(undefined);
      }
    }
  };

  const showUserDetails = () => {
    if (user) {
      return (
        <div className="admin-delete-user">
          {Object.keys(user).map((key) => {
            // @ts-ignore
            const keyInfo = user[key].toString();

            return (
              <p key={key}>
                {key}: {keyInfo}
              </p>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="admin-item">
      <h2>Delete a User</h2>
      <div onSubmit={handleSubmit} className="admin-form">
        <select required name="user" value={user?.id} onChange={onUserSelect}>
          <option value="">Select a User</option>
          {renderUsers()}
        </select>
        {user ? showUserDetails() : null}
        <button className="cancel" onClick={handleSubmit}>
          Delete User
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
