import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { setError, getDocusignUrl } from '../../actions';
import Loading from '../reusable/Loading';

const Docusign = ({ error, getDocusignUrl }) => {
  const { doc } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDocusignUrl(doc);
  }, [getDocusignUrl, doc]);

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
