import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { requiredDocuments } from './requiredDocuments';
import FileUpload from '../../reusable/FileUpload';
import { uploadFiles } from '../../../actions';
import Loading from '../../reusable/Loading';

const UploadFoodHandler = ({ alert, error, uploadFiles }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (alert) {
      navigate('../file-success');
      console.log(alert);
    }
    if (error) {
      setLoading(false);
    }
  }, [alert, navigate, error]);

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
  return { alert: state.alert.message, error: state.error.error };
};

export default connect(mapStateToProps, { uploadFiles })(UploadFoodHandler);
