import { useParams } from 'react-router-dom';

import { useGetSigningUrlQuery } from '../../../state/apis/acrobatApi';
import Loading from '../loading/Loading';

const Acrobat = () => {
  const { doc, id } = useParams();

  const { data, isLoading } = useGetSigningUrlQuery({ doc, id });

  if (data?.signingUrl) {
    window.location.href = data.signingUrl;
  }

  return (
    <div>
      <h2>Sign this Document</h2>
      {isLoading && <Loading />}
    </div>
  );
};

export default Acrobat;
