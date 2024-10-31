import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

import './Loading.css';

const Loading = () => {
  return <Spinner size={30} className="spinner" data-id="loading" />;
};

export default Loading;
