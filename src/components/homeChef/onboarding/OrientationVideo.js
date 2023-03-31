import { Link } from 'react-router-dom';

import './Orientation.css';

const OrientationVideo = () => {
  return (
    <div>
      <h1>Watch the Recorded Home Chef Orientation</h1>
      <video controls className="orientation-video">
        <source
          src="https://storage.googleapis.com/coherent-vision-368820.appspot.com/CK_HomeChef_Orientation_02012023.mp4"
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
