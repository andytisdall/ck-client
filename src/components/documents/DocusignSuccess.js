import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import server from '../../actions/api';
import { setError } from '../../actions';
import Loading from '../reusable/Loading';

const DocusignSuccess = ({ restaurant, accountType, user, setError }) => {
  const [fileCount, setFileCount] = useState(0);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const params = window.location.search.split('?')[1].split('&');
    const envelopeId = params[0].replace('envelopeId=', '');
    const event = params[1].replace('event=', '');
    if (event === 'signing_complete') {
      setSuccess(true);
      const updateSalesforce = async () => {
        let account;
        if (accountType === 'restaurant') {
          account = restaurant;
        }
        if (accountType === 'contact') {
          account = user;
        }
        try {
          const { data } = await server.post('/docusign/getDoc', {
            accountId: account.id,
            envelopeId,
            accountType,
          });
          setFileCount(data.filesAdded);
        } catch (err) {
          setError(err);
        }
      };
      updateSalesforce();
    } else {
      setSuccess(false);
    }
  }, [accountType, restaurant, user, setError]);

  const renderFileCount = () => {
    if (fileCount) {
      return (
        <div>
          <p>{fileCount} document(s) uploaded.</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Uploading signed documents...</p>
          <Loading />
        </div>
      );
    }
  };

  const renderSuccess = () => {
    return (
      <>
        <h2>Docs Signed Successfully</h2>
        {renderFileCount()}
      </>
    );
  };

  const renderFailure = () => {
    return <h2>Signing Failed</h2>;
  };

  return (
    <div>
      {success && renderSuccess()}
      {success === false && renderFailure()}
      {success === null && <Loading />}
      <Link to="../..">
        <button>Go back to Section Home</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant, user: state.user.user };
};

export default connect(mapStateToProps, { setError })(DocusignSuccess);
