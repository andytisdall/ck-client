import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { uploadDocsToSalesforce } from '../../actions';
import Loading from '../reusable/Loading';

const DocusignSuccess = ({
  uploadDocsToSalesforce,
  alert,
  error,
  returnLink,
}) => {
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams()[0];

  useEffect(() => {
    const event = searchParams.get('event');
    const envelopeId = searchParams.get('envelopeId');
    const doc = searchParams.get('doc');
    if (event === 'signing_complete') {
      uploadDocsToSalesforce(doc, envelopeId);
    } else {
      setSuccess(false);
      setLoading(false);
    }
  }, [searchParams, uploadDocsToSalesforce]);

  useEffect(() => {
    if (alert) {
      setSuccess(true);
      setLoading(false);
    }
    if (error) {
      setSuccess(false);
      setLoading(false);
    }
  }, [error, alert]);

  const renderSuccess = () => {
    return (
      <>
        <h2>Signing Successful and Documents uploaded.</h2>
      </>
    );
  };

  const renderFailure = () => {
    return <h2>Signing Failed</h2>;
  };

  return (
    <div>
      {!loading && success && renderSuccess()}
      {success === false && renderFailure()}
      {success === null && (
        <div>
          <p>Uploading Signed Documents...</p>
          <Loading />
        </div>
      )}
      <Link to={returnLink}>
        <button className="nav-button">Go back to Section Home</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    restaurant: state.restaurant.restaurant,
    user: state.user.user,
    alert: state.alert.message,
    error: state.error.error,
  };
};

export default connect(mapStateToProps, { uploadDocsToSalesforce })(
  DocusignSuccess
);
