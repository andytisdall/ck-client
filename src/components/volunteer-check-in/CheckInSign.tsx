import { Link, useParams } from 'react-router-dom';

const CheckInSign = () => {
  const { contactId } = useParams();
  return (
    <div className="check-in-volunteer">
      <p>
        Before you start, you'll need to sign the CK Kitchen Volunteer
        Agreement.
      </p>
      <Link to={`../CKK/${contactId}`}>
        <button>Sign the Agreement</button>
      </Link>
      <Link to="../../kitchen">
        <button className="cancel">Start Over</button>
      </Link>
    </div>
  );
};

export default CheckInSign;
