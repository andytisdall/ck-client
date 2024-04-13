import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Loading from '../reusable/loading/Loading';
import {
  useGenerateDeleteAccountCodeQuery,
  useVerifyDeleteAccountCodeMutation,
} from '../../state/apis/d4jApi';

const DeleteD4JAccount = () => {
  const [code, setCode] = useState('');
  const { email } = useParams();

  const { isError, isLoading: codeIsLoading } =
    useGenerateDeleteAccountCodeQuery(email || '');
  const [verifyCode, { isLoading, isSuccess }] =
    useVerifyDeleteAccountCodeMutation();

  const renderSuccess = () => {
    return <p>You have successfully deleted your account.</p>;
  };

  const renderCodeInput = () => {
    return (
      <div>
        <p>You have been emailed a code. Please enter the code here.</p>
        <form onSubmit={() => verifyCode(code)}>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            value={code}
            id="code"
            onChange={(e) => setCode(e.target.value)}
          />
          {isLoading ? <Loading /> : <input type="submit" />}
        </form>
      </div>
    );
  };

  if (isError) {
    return <p>An error has occurred.</p>;
  }

  if (codeIsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>Delete Account Data</h3>
      <h5>Email: {email}</h5>
      {isSuccess ? renderSuccess() : renderCodeInput()}
    </div>
  );
};

export default DeleteD4JAccount;
