import { Link } from 'react-router-dom';

import './TextButton.css';

const TextButton = ({ to, buttonText, descriptionText }) => {
  return (
    <Link className="text-button" to={to}>
      <div className="text-button-link">{buttonText}</div>
      <div className="text-button-description">{descriptionText}</div>
    </Link>
  );
};

export default TextButton;
