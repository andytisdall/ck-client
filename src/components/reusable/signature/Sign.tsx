import { useParams } from 'react-router-dom';

import { useGetSigningUrlQuery } from '../../../state/apis/signApi';
import Loading from '../loading/Loading';

const Sign = () => {
  const { doc, contactId, shiftId } = useParams();
  const { data, isLoading } = useGetSigningUrlQuery({
    doc,
    contactId,
    shiftId,
  });

  if (data) {
    if (data.signingUrl) {
      window.location.href = data.signingUrl;
    } else {
      return (
        <div>
          <p>You have already signed this document.</p>
        </div>
      );
    }
  }

  return (
    <div>
      <h2>Sign this Document</h2>
      <p>You will be redirected to sign.</p>
      {isLoading && <Loading />}
    </div>
  );
};

export default Sign;
