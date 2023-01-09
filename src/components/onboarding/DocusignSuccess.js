import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import server from '../../actions/api';

const DocusignSuccess = ({ restaurant }) => {
  const [fileCount, setFileCount] = useState(0);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const params = window.location.search.split('?')[1].split('&');
    const envelopeId = params[0].replace('envelopeId=', '');
    const event = params[1].replace('event=', '');
    if (event === 'signing_complete') {
      setSuccess(true);
      const updateSalesforce = async () => {
        const { data } = await server.post('/docusign/getDoc', {
          restaurantId: restaurant.id,
          envelopeId,
        });
        setFileCount(data.filesAdded);
      };
      updateSalesforce();
    } else {
      setSuccess(false);
    }
  }, [restaurant.id]);

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
          <Spinner size={20} color="black" />
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
      {success === null && <Spinner size={20} color="black" />}
      <Link to="../..">
        <button>Go back to Onboarding Home</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { restaurant: state.restaurant.restaurant };
};

export default connect(mapStateToProps, null)(DocusignSuccess);
