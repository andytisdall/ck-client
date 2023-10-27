import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useUploadSignedDocsToSalesforceMutation } from '../../../state/apis/docusignApi';
import { useLazyGetVolunteerQuery } from '../../../state/apis/volunteerApi';
import Loading from '../loading/Loading';

const DocusignSuccess = ({ returnLink }: { returnLink: string }) => {
  const searchParams = useSearchParams()[0];

  const email = searchParams.get('email') || undefined;

  const [getVolunteer] = useLazyGetVolunteerQuery();

  const [uploadDocsToSalesforce, { isLoading, isSuccess }] =
    useUploadSignedDocsToSalesforceMutation();
  useEffect(() => {
    const event = searchParams.get('event');
    const envelopeId = searchParams.get('envelopeId');
    const doc = searchParams.get('doc');
    if (doc && envelopeId && event === 'signing_complete') {
      uploadDocsToSalesforce({ doc, envelopeId, email })
        .unwrap()
        .then(() => {
          if (email) {
            getVolunteer(email);
          }
        });
    }
  }, [uploadDocsToSalesforce, searchParams, email, getVolunteer]);

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
