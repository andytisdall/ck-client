import { connect } from 'react-redux';
import { useState } from 'react';

import Loading from '../../reusable/loading/Loading';
import useLoading from '../../../hooks/useLoading';
import * as actions from '../../../actions';

const HomeChefNotification = ({ sendHomeChefNotification }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useLoading();

  const handleSend = () => {
    setLoading(true);
    sendHomeChefNotification(title, message);
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      {loading ? (
        <Loading />
      ) : (
        <div className="button" onClick={handleSend}>
          Send Notification
        </div>
      )}
    </div>
  );
};

export default connect(null, actions)(HomeChefNotification);
