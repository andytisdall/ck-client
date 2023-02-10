import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import server from '../../actions/api';
import { setError } from '../../actions';
import Loading from '../reusable/Loading';

const Docusign = ({ accountType, setError }) => {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];

  useEffect(() => {
    // const authCode = searchParams.get('code');
    const getRedirectUrl = async () => {
      // const authCode = window.location.search.replace('?code=', '');
      try {
        const res = await server.post('/docusign/sign', {
          // authCode,
          accountType,
        });
        const redirectUrl = res.data;
        window.location.href = redirectUrl;
      } catch (err) {
        setError(err);
        navigate('../..');
      }
    };
    getRedirectUrl();
  }, [accountType, navigate, setError, searchParams]);

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
