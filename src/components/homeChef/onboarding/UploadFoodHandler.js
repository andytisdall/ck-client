import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { requiredDocuments } from './requiredDocuments';
import FileUpload from '../../reusable/FileUpload';
import * as actions from '../../../actions';
import Loading from '../../reusable/Loading';

const UploadFoodHandler = ({ error, uploadFiles }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [navigate, error]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadFiles(e.target, 'contact');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FileUpload doc={requiredDocuments.foodHandler} />
        {loading ? <Loading /> : <input type="submit" />}
      </form>
      <p>
        Don't have your food handler certificate yet?{' '}
        <Link className="retro-link" to="">
          Click here to apply.
        </Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error.error };
};

export default connect(mapStateToProps, actions)(UploadFoodHandler);
