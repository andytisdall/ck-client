import { Link } from 'react-router-dom';

import './Orientation.css';

const OrientationSlides = () => {
  const renderSlides = () => {
    const images = [];
    for (let i = 1; i < 24; i++) {
      images.push(
        <img
          className="orientation-slides"
          key={`slide-${i}`}
          src={`/images/home-chef/orientation-slides/slide-${i}.jpg`}
          alt={`Slide ${i} from the last home chef orientation`}
        />
      );
    }
    return <>{images}</>;
  };

  return (
    <div>
      <h1>Orientation Info Slides</h1>
      <div className="orientaton-slides-container">{renderSlides()}</div>{' '}
      <Link to="..">
        <button className="nav-button">Back to Onboarding</button>
      </Link>
    </div>
  );
};

export default OrientationSlides;
