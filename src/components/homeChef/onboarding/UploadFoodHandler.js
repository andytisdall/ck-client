import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { requiredDocuments } from './requiredDocuments';
import FileUpload from '../../documents/FileUpload';
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
    <form onSubmit={onSubmit}>
      <FileUpload doc={requiredDocuments.foodHandler} />
      {loading ? <Loading /> : <input type="submit" />}
    </form>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message, error: state.error.error };
};

export default connect(mapStateToProps, { uploadFiles })(UploadFoodHandler);
