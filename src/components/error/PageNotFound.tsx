import { Link } from 'react-router-dom';

import Header from '../Header';

const PageNotFound = () => {
  return (
    <div>
      <Header />
      <div className="main error-page">
        <h1>This page does not exist on the Community Kitchens portal.</h1>
        <p>
          If you want to report an issue, please email{' '}
          <a href="mailto:andy@ckoakland.org">andy@ckoakland.org</a>
        </p>
        <Link to="/">
          <button className="nav-button">Community Kitchens Home</button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
