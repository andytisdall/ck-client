import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';
import { Link } from 'react-router-dom';

import FileUpload from './FileUpload';
import { uploadFiles } from '../../actions';
import { requiredDocuments } from './requiredDocuments';

const Documents = ({ uploadFiles, alert }) => {
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
  }, [alert, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadFiles(e.target);
  };

  return (
    <div>
      <div>Upload documents.</div>
      <form onSubmit={handleSubmit}>
        <div className="file-form">
          {renderUploadForms()}
          <div className="file-upload">
            <label htmlFor="expiration">
              Health Department Permit Expiration Date
            </label>
            <input type="date" name="expiration" className="calendar" />
          </div>
        </div>
        {loading ? (
          <Spinner size={15} color="black" style={{ marginLeft: '2rem' }} />
        ) : (
          <input type="submit" />
        )}
      </form>
      <Link to="../docusign/login">
        <button>Sign Documents</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message };
};

export default connect(mapStateToProps, { uploadFiles })(Documents);
