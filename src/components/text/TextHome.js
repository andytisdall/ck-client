import { Link } from 'react-router-dom';

const TextHome = () => {
  return (
    <div className="text-main">
      <Link to="add-phone" className="home-link">
        Add a Phone Number to the List
      </Link>
      <Link to="send-text" className="home-link">
        Send a Text to the List
      </Link>
      <Link to="feedback" className="home-link">
        Review Feedback
      </Link>
    </div>
  );
};

export default TextHome;
