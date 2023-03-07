import { connect } from 'react-redux';
import { useState } from 'react';

import FileUpload from '../reusable/FileUpload';
import * as actions from '../../actions';
import { requiredDocuments } from './requiredDocuments';
import Loading from '../reusable/Loading';
import useLoading from '../../hooks/useLoading';

const Documents = ({ uploadFiles }) => {
  const [expirationDate, setExpirationDate] = useState('');

  const [loading, setLoading] = useLoading();

  const renderUploadForms = () => {
    return requiredDocuments.map((doc) => {
      return <FileUpload doc={doc} key={doc.data} />;
    });
  };

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
              className="date-picker"
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

export default connect(null, actions)(Documents);
