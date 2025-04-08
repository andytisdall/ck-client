import { Link } from 'react-router-dom';

import { useRequestHomeChefAgreementQuery } from '../../../state/apis/signApi';

const EmailAgreement = () => {
  useRequestHomeChefAgreementQuery();

  return (
    <div>
      <h3>The Home Chef agreement will be emailed to you shortly.</h3>
      <Link to="..">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default EmailAgreement;
