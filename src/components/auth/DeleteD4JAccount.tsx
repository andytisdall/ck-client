import { useParams } from 'react-router-dom';
import { useState } from 'react';

import '../Home.css';
import './SignedOut/SignIn.css';
import Loading from '../reusable/loading/Loading';
import {
  useLazyGenerateDeleteAccountCodeQuery,
  useVerifyDeleteAccountCodeMutation,
} from '../../state/apis/d4jApi';

const DeleteD4JAccount = () => {
  const [code, setCode] = useState('');
  const { email } = useParams();

  const [
    generateCode,
    {
      isError: generateCodeError,
      isLoading: codeGenerationIsLoading,
      isSuccess: codeGenerated,
    },
  ] = useLazyGenerateDeleteAccountCodeQuery();
  const [
    verifyCode,
    {
      isLoading: codeVerificationIsLoading,
      isSuccess: codeVerified,
      isError: verifyCodeError,
    },
  ] = useVerifyDeleteAccountCodeMutation();

  const renderSuccess = () => {
    return <p>You have successfully deleted your account.</p>;
  };

  const renderCodeInput = () => {
    if (email) {
      return (
        <div>
          <p>You have been emailed a code. Please enter the code here.</p>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            value={code}
            id="code"
            onChange={(e) => setCode(e.target.value)}
          />
          {codeVerificationIsLoading ? (
            <Loading />
          ) : (
            <button onClick={() => verifyCode({ code, email })}>Submit</button>
          )}
        </div>
      );
    }
  };

  const renderGenerateCode = () => {
    if (email) {
      return (
        <div>
          <p>To delete your data, click below</p>
          {codeGenerationIsLoading ? (
            <Loading />
          ) : (
            <button onClick={() => generateCode(email)}>Delete My Data</button>
          )}
        </div>
      );
    }
  };

  const renderForm = () => {
    if (generateCodeError || verifyCodeError || !email) {
      return <p>An error has occurred.</p>;
    }

    if (!codeGenerated) {
      return renderGenerateCode();
    }

    return (
      <>
        <h3>Delete Account Data</h3>
        <h5>Email: {email}</h5>
        {codeVerified ? renderSuccess() : renderCodeInput()}
      </>
    );
  };

  return <div className="main user">{renderForm()}</div>;
};

export default DeleteD4JAccount;
