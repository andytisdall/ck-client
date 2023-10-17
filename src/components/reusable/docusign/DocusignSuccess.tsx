import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useUploadSignedDocsToSalesforceMutation } from '../../../state/apis/docusignApi';
import Loading from '../loading/Loading';

const DocusignSuccess = ({
  returnLink,
  includeEmail,
}: {
  returnLink: string;
  includeEmail?: boolean;
}) => {
  const searchParams = useSearchParams()[0];

  const email = searchParams.get('email');

  const [uploadDocsToSalesforce, { isLoading, isSuccess }] =
    useUploadSignedDocsToSalesforceMutation();
  useEffect(() => {
    const event = searchParams.get('event');
    const envelopeId = searchParams.get('envelopeId');
    const doc = searchParams.get('doc');
    if (doc && envelopeId && event === 'signing_complete') {
      uploadDocsToSalesforce({ doc, envelopeId, email: email || undefined });
    }
  }, [uploadDocsToSalesforce, searchParams, email]);

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

  const link = includeEmail ? returnLink + '/' + email : returnLink;

  return (
    <div>
      {!isLoading && isSuccess && renderSuccess()}
      {!isLoading && !isSuccess && renderFailure()}
      {isLoading && (
        <div>
          <p>Uploading Signed Documents...</p>
          <Loading />
        </div>
      )}
      <Link to={link}>
        <button className="nav-button">Go back to Section Home</button>
      </Link>
    </div>
  );
};

export default DocusignSuccess;
