import { Link } from 'react-router-dom';

const InviteSent = () => {
  return (
    <div>
      <p>
        Your invitation was sent! Thanks for helping expand the home chef
        program!
      </p>
      <Link to="../..">
        <button>Home Chef Hub</button>
      </Link>
    </div>
  );
};

export default InviteSent;
