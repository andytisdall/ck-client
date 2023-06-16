import { connect } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import FileUpload from '../../reusable/FileUpload';
import * as actions from '../../../actions';
import { uploadDocuments } from './requiredDocuments';
import Loading from '../../reusable/Loading';
import useLoading from '../../../hooks/useLoading';

const UploadDocuments = ({ uploadFiles, restaurant }) => {
  const [expirationDate, setExpirationDate] = useState('');

  const [loading, setLoading] = useLoading();

  const renderUploadForms = () => {
    const remainingDocs = restaurant.remainingDocs.map((d) => d.docType);
    return uploadDocuments.map((doc) => {
      const outstanding = remainingDocs.includes(doc.data);
      const text = outstanding
        ? 'This document is outstanding'
        : 'This document has already been uploaded';
      const style = outstanding ? 'outstanding' : 'completed';
      return (
        <div className="meal-file-row" key={doc.data}>
          <div className="meal-file-upload">
            <FileUpload doc={doc} key={doc.data} />
          </div>
          <div className={`meal-file-info ${style}`}>{text}</div>
        </div>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadFiles(e.target, 'restaurant', expirationDate);
  };

  const calendarStyle = expirationDate ? 'field-completed' : '';

  const expirationStyle = restaurant.healthPermitExpired
    ? 'outstanding'
    : 'completed';

  const expirationMessage = restaurant.healthPermitExpired
    ? 'Your health department permit is expired'
    : 'Your health department permit is valid';

  return (
    <div>
      <h3>Upload Your Required Onboarding Documents</h3>
      <form onSubmit={handleSubmit}>
        <div className="file-form">
          {renderUploadForms()}
          <div className="meal-file-row">
            <div className="meal-file-upload">
              <div className={`file-upload ${calendarStyle}`}>
                <label htmlFor="expiration">
                  Health Department Permit Expiration Date
                </label>
                <input
                  type="date"
                  name="expiration"
                  className="date-picker"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>
            </div>
            <div className={`meal-file-info ${expirationStyle}`}>
              {expirationMessage}
            </div>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <input type="submit" value="Submit" />
            <Link to="..">
              <button className="sign-documents-cancel cancel">Cancel</button>
            </Link>
          </>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    restaurant: state.restaurant.restaurant,
  };
};

export default connect(mapStateToProps, actions)(UploadDocuments);
