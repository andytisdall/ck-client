import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Loading from '../../reusable/loading/Loading';
import { setAlert } from '../../../state/apis/slices/alertSlice';

const NotificationForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (args: { title: string; message: string }) => {
    unwrap: () => Promise<null>;
  };
  isLoading: boolean;
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    onSubmit({ title, message })
      .unwrap()
      .then(() => {
        dispatch(setAlert('Notification Sent'));
        setTitle('');
        setMessage('');
      });
  };

  return (
    <div className="admin-form">
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Message:</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="button cancel" onClick={handleSubmit}>
          Send Notification
        </div>
      )}
    </div>
  );
};

export default NotificationForm;
