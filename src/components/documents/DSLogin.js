import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import server from '../../actions/api';
import { setError } from '../../actions';

const DSLogin = ({ accountType, setError }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const getAuthUrl = async () => {
      try {
        const res = await server.get('/docusign/login/' + accountType);
        window.location.href = res.data.replace('account', 'account-d');
      } catch (err) {
        setError(err);
        navigate('../..');
      }
    };
    getAuthUrl();
  }, [accountType, navigate, setError]);
  return <div>Redirecting to Docusign...</div>;
};

export default connect(null, { setError })(DSLogin);
