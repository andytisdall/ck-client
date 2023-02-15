import { Link } from 'react-router-dom';

const TextHome = () => {
  return (
    <div className="text-main">
      <Link to="send-text" className="home-link">
        Send a Town Fridge Delivery Alert
      </Link>
      <Link to="send-custom-text" className="home-link">
        Send a Custom Alert
      </Link>
      <Link to="add-phone" className="home-link">
        Add a Phone Number to the List
      </Link>
      <Link to="feedback" className="home-link">
        Review Feedback
      </Link>
    </div>
  );
};

export default TextHome;
