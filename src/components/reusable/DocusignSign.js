import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setError, getDocusignUrl } from '../../actions';
import Loading from '../reusable/Loading';

const Docusign = ({ accountType, error, getDocusignUrl }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getDocusignUrl(accountType);
  }, [getDocusignUrl, accountType]);

  useEffect(() => {
    if (error) {
      navigate('../..');
    }
  }, [error, navigate]);

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

export default connect(mapStateToProps, { setError, getDocusignUrl })(Docusign);
