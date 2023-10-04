import { useNavigate, useParams } from 'react-router-dom';

import { useGetDocusignUrlQuery } from '../../../state/apis/docusignApi';
import Loading from '../loading/Loading';

const Docusign = () => {
  const { doc } = useParams();
  const navigate = useNavigate();

  const { data, error } = useGetDocusignUrlQuery(doc);

  if (data) {
    window.location.href = data;
  }

  if (error) {
    navigate('../..');
  }

  return (
    <div>
      <Loading />
      <p>Generating contracts...</p>
    </div>
  );
};

export default Docusign;
