import { useState, FormEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FileUpload from '../../reusable/file/FileUpload';
import { uploadDocuments } from './requiredDocuments';
import Loading from '../../reusable/loading/Loading';
import { useGetRestaurantInfoQuery } from '../../../state/apis/mealProgramApi';
import { useUploadFilesMutation } from '../../../state/apis/fileApi';

const UploadDocuments = () => {
  const [expirationDate, setExpirationDate] = useState('');

  const restaurantInfo = useGetRestaurantInfoQuery().data;

  const [uploadFiles, { isLoading }] = useUploadFilesMutation();

  const navigate = useNavigate();

  const renderUploadForms = () => {
    const remainingDocs = restaurantInfo?.remainingDocs.map((d) => d.docType);
    return uploadDocuments.map((doc) => {
      const outstanding = remainingDocs?.includes(doc.data);
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(e.currentTarget.elements).forEach((input) => {
      if (input instanceof HTMLInputElement && input.files?.length) {
        formData.append(input.name, input.files[0]);
      }
    });
    uploadFiles({
      formData,
      accountType: 'restaurant',
      expiration: expirationDate,
    })
      .unwrap()
      .then((response) => navigate('../file-success/' + response.length));
  };

  const calendarStyle = expirationDate ? 'field-completed' : '';

  const expirationStyle = restaurantInfo?.healthPermitExpired
    ? 'outstanding'
    : 'completed';

  const expirationMessage = restaurantInfo?.healthPermitExpired
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
        {isLoading ? (
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

export default UploadDocuments;
