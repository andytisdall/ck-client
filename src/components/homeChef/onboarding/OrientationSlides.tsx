import { Link } from 'react-router-dom';

import './Orientation.css';

const OrientationSlides = () => {
  const renderSlides = () => {
    const images = [];
    for (let i = 1; i <= 20; i++) {
      images.push(
        <a
          href={`https://portal.ckoakland.org/images/home-chef/orientation-slides/slide-${i}.jpg`}
          key={`slide-${i}`}
        >
          <img
            className="orientation-slides"
            src={`/images/home-chef/orientation-slides/slide-${i}.jpg`}
            alt={`Slide ${i} from the last home chef orientation`}
          />
        </a>
      );
    }
    return <>{images}</>;
  };

  return (
    <div>
      <h1>Orientation Info Slides</h1>
      <div className="orientation-slides-container">{renderSlides()}</div>{' '}
      <Link to="..">
        <button className="nav-button">Back to Onboarding</button>
      </Link>
    </div>
  );
};

export default OrientationSlides;
