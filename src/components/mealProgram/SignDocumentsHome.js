import { Link } from 'react-router-dom';

const SignDocumentsHome = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="sign/W9">W9</Link>
        </li>
        <li>
          <Link to="sign/DD">Direct Deposit</Link>
        </li>
        <li>
          <Link to="sign/RC">Restaurant Contract</Link>
        </li>
      </ul>
    </div>
  );
};

export default SignDocumentsHome;
