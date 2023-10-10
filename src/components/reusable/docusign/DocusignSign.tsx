import { useNavigate, useParams } from 'react-router-dom';

import { useGetDocusignUrlQuery } from '../../../state/apis/docusignApi';
import Loading from '../loading/Loading';

const Docusign = () => {
  const { doc } = useParams();
  const navigate = useNavigate();

  const { data, error } = useGetDocusignUrlQuery(doc);

  if (data?.url) {
    window.location.href = data.url;
  }

  if (error) {
    navigate('../..');
  }

  if (!doc) {
    return <p>No document selected.</p>;
  }

  return (
    <div>
      <Loading />
      <p>Generating contracts...</p>
    </div>
  );
};

export default Docusign;
