import { useEffect } from 'react';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import server from '../../actions/api';

const Docusign = () => {
  useEffect(() => {
    const getRedirectUrl = async () => {
      const authCode = window.location.search.replace('?code=', '');
      const res = await server.post('/docusign/sign', {
        authCode,
      });
      window.location.href = res.data;
    };
    getRedirectUrl();
  }, []);

  return (
    <div>
      <Spinner size={20} color="black" />
      <p>Generating contracts...</p>
    </div>
  );
};

export default Docusign;
