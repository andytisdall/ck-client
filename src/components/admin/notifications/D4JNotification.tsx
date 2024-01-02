import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Loading from '../../reusable/loading/Loading';
import { setAlert } from '../../../state/apis/slices/alertSlice';
import { useSendD4JNotificationMutation } from '../../../state/apis/d4jApi';

const HomeChefNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const [sendD4JNotification, { isLoading }] = useSendD4JNotificationMutation();

  const handleSend = () => {
    sendD4JNotification({ title, message })
      .unwrap()
      .then(() => {
        dispatch(setAlert('Notification Sent'));
      });
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
