import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import server from '../../actions/api';
import { setError } from '../../actions';
import Loading from '../reusable/Loading';

const Docusign = ({ accountType, docCode, setError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const getRedirectUrl = async () => {
      const authCode = window.location.search.replace('?code=', '');
      try {
        const res = await server.post('/docusign/sign', {
          authCode,
          accountType,
          docCode,
        });
        const redirectUrl = res.data;
        window.location.href = redirectUrl;
      } catch (err) {
        setError(err);
        navigate('../..');
      }
    };
    getRedirectUrl();
  }, [accountType, docCode, navigate, setError]);

  return (
    <div>
      <Loading />
      <p>Generating contracts...</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error.error };
};

export default connect(mapStateToProps, { setError })(Docusign);
