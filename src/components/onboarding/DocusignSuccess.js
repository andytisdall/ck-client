import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import server from '../../actions/api';

const DocusignSuccess = ({ restaurant }) => {
  const [result, setResult] = useState('');
  const [envelopeId, setEnvelopeId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const searchParams = window.location.search.split('?')[1].split('&');
    // const event = searchParams[2].replace('event=', '');
    // if (event !== 'signing_complete') {
    //   setResult('Fail');
    // } else {
    setResult('Succeed');
    setEnvelopeId(searchParams[0].replace('envelopeId=', ''));
    setToken(searchParams[1].replace('token=', ''));
    // }
  }, []);

  // useEffect(() => {
  //   if (result) {
  //     const updateSalesforce = async () => {
  //       const filesAdded = await server.post('/docusign/getDoc', { envelopeId, token });
  //       console.log('Files added: ' + filesAdded)
  //     }
  //     updateSalesforce();
  //   }
  // }, [result])

  return (
    <div>
      <div>
        <p>You {result}</p>
      </div>
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
