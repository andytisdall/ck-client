import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useSignInAsUserMutation } from '../../../state/apis/authApi';
import { useGetAllUsersQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';

const SignInAsUser = () => {
  const [userId, setUserId] = useState('');

  const { data: users } = useGetAllUsersQuery();
  const [signInAsUser, { isLoading }] = useSignInAsUserMutation();

  const navigate = useNavigate();

  const renderUsers = () => {
    if (users) {
      return Object.values(users)
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

  return (
    <div className="admin-item">
      <h2>Sign in as a User</h2>
      <div className="admin-form">
        <select onChange={(e) => setUserId(e.target.value)}>
          {renderUsers()}
        </select>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            onClick={async () => {
              await signInAsUser(userId);
              navigate('/');
            }}
            disabled={!userId}
          >
            Sign In As User
          </button>
        )}
      </div>
    </div>
  );
};

export default SignInAsUser;
