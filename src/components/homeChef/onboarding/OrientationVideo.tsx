import { Link } from 'react-router-dom';

import './Orientation.css';

const VIDEO_NAME = 'Orientation_072324.mp4';

const OrientationVideo = () => {
  return (
    <>
      <div>
        <h1>Watch the Recorded Home Chef Orientation</h1>
        <h3>
          Click the link below to take the home chef quiz when you're ready.
        </h3>
        <video controls className="orientation-video">
          <source
            src={`https://storage.googleapis.com/coherent-vision-368820.appspot.com/${VIDEO_NAME}`}
            type="video/mp4"
          />
        </video>
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
