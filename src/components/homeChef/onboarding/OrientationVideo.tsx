import { Link } from 'react-router-dom';

import './Orientation.css';

const VIDEO_NAME = 'Orientation_October2023.mp4';

const OrientationVideo = () => {
  return (
    <div>
      <h1>Watch the Recorded Home Chef Orientation</h1>
      <video controls className="orientation-video">
        <source
          src={`https://storage.googleapis.com/coherent-vision-368820.appspot.com/${VIDEO_NAME}`}
          type="video/mp4"
        />
      </video>
      <Link to="..">
        <button>Back to Onboarding</button>
      </Link>
    </div>
  );
};

export default OrientationVideo;
