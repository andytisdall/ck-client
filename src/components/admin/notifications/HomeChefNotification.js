import { connect } from 'react-redux';

import * as actions from '../../../actions';

const HomeChefNotification = ({ sendHomeChefNotification }) => {
  return (
    <div>
      <div className="button" onClick={sendHomeChefNotification}>
        Send Notification
      </div>
    </div>
  );
};

export default connect(null, actions)(HomeChefNotification);
