import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSendHomeChefNotificationMutation } from '../../../state/apis/volunteerApi/homeChefApi';
import Loading from '../../reusable/loading/Loading';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const HomeChefNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const [sendHomeChefNotification, { isLoading }] =
    useSendHomeChefNotificationMutation();

  const handleSend = () => {
    sendHomeChefNotification({ title, message }).then(() => {
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
