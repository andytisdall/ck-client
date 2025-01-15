import { Link, useParams, useNavigate } from 'react-router-dom';

const CheckInSign = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="check-in-volunteer">
      <p>
        Before you start, you'll need to sign the CK Kitchen Volunteer
        Agreement.
      </p>
      <Link to={`../CKK/${contactId}`}>
        <button>Sign the Agreement</button>
      </Link>
      <button onClick={() => navigate(-1)} className="cancel">
        Start Over
      </button>
    </div>
  );
};

export default CheckInSign;
