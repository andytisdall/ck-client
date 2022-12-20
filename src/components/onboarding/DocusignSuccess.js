import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import server from '../../actions/api';

const DocusignSuccess = () => {
  const [result, setResult] = useState('');
  const [envelopeId, setEnvelopeId] = useState();

  useEffect(() => {
    const searchParams = window.location.search.split('&');
    const event = searchParams[1].replace('event=', '');
    if (event !== 'signing_complete') {
      setResult('Fail');
    } else {
      setResult('Succeed');
      setEnvelopeId(searchParams[0].replace('?envelopeId=', ''));
    }
  }, []);

  // useEffect(() => {
  //   if (envelopeId) {
  //     // query signed contracts from server, and update sf data
  //     const getDocs = async () => {
  //       const docs = await server.get(`/docusign/getDoc/${envelopeId}`);
  //     };
  //   }
  // }, [envelopeId]);

  return (
    <div>
      <div>You {result}</div>
      <Link to="../documents">
        <button>Go back to Docs</button>
      </Link>
      {envelopeId && (
        <a href={`http://localhost:3001/docusign/getDoc/${envelopeId}`}>
          <button>Get Doc</button>
        </a>
      )}
    </div>
  );
};

export default DocusignSuccess;
