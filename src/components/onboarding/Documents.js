import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FileUpload from '../documents/FileUpload';
import { uploadFiles } from '../../actions';
import { requiredDocuments } from './requiredDocuments';
import Loading from '../reusable/Loading';

const Documents = ({ uploadFiles, alert, error }) => {
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const renderUploadForms = () => {
    return requiredDocuments.map((doc) => {
      return <FileUpload doc={doc} key={doc.data} />;
    });
  };

  useEffect(() => {
    if (alert) {
      navigate('../file-success');
    }
    if (error) {
      setLoading(false);
    }
  }, [alert, navigate, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadFiles(e.target, 'restaurant');
  };

  const calendarStyle = expirationDate ? 'field-completed' : '';

  return (
    <div>
      <div>Upload documents.</div>
      <form onSubmit={handleSubmit}>
        <div className="file-form">
          {renderUploadForms()}
          <div className={`file-upload ${calendarStyle}`}>
            <label htmlFor="expiration">
              Health Department Permit Expiration Date
            </label>
            <input
              type="date"
              name="expiration"
              className="calendar"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
        </div>
        {loading ? <Loading /> : <input type="submit" />}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message, error: state.error.error };
};

export default connect(mapStateToProps, { uploadFiles })(Documents);
