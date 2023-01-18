import { Link } from 'react-router-dom';

const TextHome = () => {
  return (
    <div className="text-main">
      <Link to="add-phone">
        <button>Add a Phone Number to the List</button>
      </Link>
      <Link to="send-text">
        <button>Send a Text to the List</button>
      </Link>
    </div>
  );
};

export default TextHome;
