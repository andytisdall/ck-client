import { Link } from 'react-router-dom';

const TextButton = ({ to, buttonText, descriptionText }) => {
  return (
    <div>
      <Link className="home-link" to={to}>
        {buttonText}
      </Link>
      <div>{descriptionText}</div>
    </div>
  );
};
