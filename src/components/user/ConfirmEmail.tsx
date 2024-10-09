import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useConfirmEmailMutation } from '../../state/apis/d4jApi';
import Loading from '../reusable/loading/Loading';

const ConfirmEmail = () => {
  const { code } = useParams();
  const [confirmEmail, { isSuccess, isLoading, isError }] =
    useConfirmEmailMutation();

  useEffect(() => {
    if (code) {
      confirmEmail({ code });
    }
  }, [code, confirmEmail]);

  return (
    <div className="main user">
      {isLoading && <Loading />}
      {isSuccess && (
        <div>
          <h3>Confirmation Successful!</h3>
          <p>You now have full access to the Dining for Justice app</p>
        </div>
      )}
      {isError && <h4>Unable to verify</h4>}
    </div>
  );
};

export default ConfirmEmail;
