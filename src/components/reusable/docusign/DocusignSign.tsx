import { useNavigate, useParams } from 'react-router-dom';

import { useGetDocusignUrlQuery } from '../../../state/apis/docusignApi';
import Loading from '../loading/Loading';

const Docusign = () => {
  const { doc, id } = useParams();
  const navigate = useNavigate();

  const { data, error } = useGetDocusignUrlQuery({ doc, id });

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
      <p>Generating document...</p>
    </div>
  );
};

export default Docusign;
