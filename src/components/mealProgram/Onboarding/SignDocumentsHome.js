import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signDocuments } from './requiredDocuments';

const SignDocumentsHome = ({ restaurant }) => {
  const renderSignLinks = () => {
    const remainingDocs = restaurant.remainingDocs.map((d) => d.docType);
    return signDocuments.map((doc) => {
      const outstanding = remainingDocs.includes(doc.data);
      const text = outstanding
        ? 'This document is outstanding'
        : 'This document has already been uploaded';
      const style = outstanding ? 'outstanding' : 'completed';
      return (
        <div className="meal-file-row" key={doc.data}>
          <div className="meal-file-upload">
            <Link className="text-button-link" to={`sign/${doc.data}`}>
              Complete Your {doc.name}
            </Link>
          </div>
          <div className={`meal-file-info ${style}`}>{text}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="file-form">{renderSignLinks()}</div>
      <Link to="..">
        <button className="sign-documents-cancel cancel">Cancel</button>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps)(SignDocumentsHome);
