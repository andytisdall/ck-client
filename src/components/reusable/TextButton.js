import { Link } from 'react-router-dom';

import './TextButton.css';

const TextButton = ({ to, buttonText, descriptionText, outside = false }) => {
  const contents = () => {
    return (
      <>
        <div className="text-button-link text-button-width">{buttonText}</div>
        <div className="text-button-description">{descriptionText}</div>
      </>
    );
  };
  if (!outside) {
    return (
      <Link className="text-button" to={to}>
        {contents()}
      </Link>
    );
  } else {
    return (
      <a className="text-button" href={to} target="blank">
        {contents()}
      </a>
    );
  }
};

export default TextButton;
