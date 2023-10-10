import { Link, useSearchParams } from 'react-router-dom';
import { useUploadSignedDocsToSalesforceMutation } from '../../../state/apis/docusignApi';
import Loading from '../loading/Loading';

const DocusignSuccess = ({ returnLink }: { returnLink: string }) => {
  const searchParams = useSearchParams()[0];

  const [uploadDocsToSalesforce, { isLoading, isSuccess }] =
    useUploadSignedDocsToSalesforceMutation();

  const event = searchParams.get('event');
  const envelopeId = searchParams.get('envelopeId');
  const doc = searchParams.get('doc');
  if (doc && envelopeId && event === 'signing_complete') {
    uploadDocsToSalesforce({ doc, envelopeId });
  }

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
      {!isLoading && isSuccess && renderSuccess()}
      {!isLoading && !isSuccess && renderFailure()}
      {isLoading && (
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

export default DocusignSuccess;
