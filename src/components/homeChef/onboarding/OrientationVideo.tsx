import { Link } from 'react-router-dom';

import './Orientation.css';

const VIDEO_FILE =
  'https://storage.googleapis.com/coherent-vision-368820.appspot.com/Home%20Chef%20Orientation.mp4';

const OrientationVideo = () => {
  return (
    <>
      <div>
        <h1>Home Chef Orientation</h1>
        <h3>
          Click the link below to take the home chef quiz when you're finished.
        </h3>
        <div className="orientation-video-container">
          <video controls className="orientation-video">
            <source src={VIDEO_FILE} type="video/mp4" />
          </video>
        </div>
      </div>
      <div>
        <Link to="..">
          <button>Back to Onboarding</button>
        </Link>
        <Link to="../quiz">
          <button>Take the Home Chef quiz</button>
        </Link>
      </div>
    </>
  );
};

export default OrientationVideo;
