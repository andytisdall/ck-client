import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import server from '../../actions/api';

const DocusignSuccess = ({ restaurant }) => {
  const [result, setResult] = useState('');
  const [envelopeId, setEnvelopeId] = useState('');

  useEffect(() => {
    const envelopeIdParam = window.location.search.split('?')[1];
    // const event = searchParams[2].replace('event=', '');
    // if (event !== 'signing_complete') {
    //   setResult('Fail');
    // } else {
    setResult('Succeed');
    setEnvelopeId(envelopeIdParam.replace('envelopeId=', ''));
    // }
  }, []);

  useEffect(() => {
    if (result === 'Succeed') {
      const updateSalesforce = async () => {
        const filesAdded = await server.post('/docusign/getDoc', {
          restaurantId: restaurant.id,
          envelopeId,
        });
        console.log('Files added: ' + filesAdded);
      };
      updateSalesforce();
    }
  }, [result]);

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
