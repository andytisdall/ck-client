import { useState } from 'react';

import { useSendHomeChefNotificationMutation } from '../../../state/apis/homeChefApi';
import Loading from '../../reusable/loading/Loading';

const HomeChefNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [sendHomeChefNotification, { isLoading }] =
    useSendHomeChefNotificationMutation();

  const handleSend = () => {
    sendHomeChefNotification({ title, message });
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="button" onClick={handleSend}>
          Send Notification
        </div>
      )}
    </div>
  );
};

export default HomeChefNotification;
