import { useEffect } from 'react';

import server from '../../actions/api';

const DSLogin = () => {
  useEffect(() => {
    const getAuthUrl = async () => {
      const res = await server.get('/docusign/login');
      window.location.href = res.data.replace('account', 'account-d');
    };
    getAuthUrl();
  }, []);
  return <div>Redirecting to Docusign...</div>;
};

export default DSLogin;
