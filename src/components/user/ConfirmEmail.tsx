import { useParams } from 'react-router-dom';
import { useConfirmEmailQuery } from '../../state/apis/d4jApi';
import Loading from '../reusable/loading/Loading';

const ConfirmEmail = () => {
  const { code } = useParams();
  const { isSuccess, isLoading, isError } = useConfirmEmailQuery(code || '');

  return (
    <div className="main user">
      {isLoading && <Loading />}
      {isSuccess && <h3>Confirmation Successful!</h3>}
      {isError && (
        <h4>An error occurred and we were not able to confirm this account.</h4>
      )}
    </div>
  );
};

export default ConfirmEmail;
