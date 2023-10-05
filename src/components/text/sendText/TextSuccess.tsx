import { Link } from 'react-router-dom';
import { format } from 'date-fns-tz';

import { useSendTextMutation } from '../../../state/apis/textApi';

const TextSuccess = () => {
  const [, sendTextResult] = useSendTextMutation({
    fixedCacheKey: 'sent-text',
  });
  const message = sendTextResult.data;
  if (message) {
    return (
      <div>
        <h1>Success!</h1>
        <div className="file-success">
          <p>You have successfully sent this text:</p>
          <p>{message.message}</p>
          <p>Region: {message.region}</p>
          {!!message.number && <p>Number: {message.number}</p>}
          {message.sendAt && (
            <p>
              This message will be sent at{' '}
              {format(new Date(message.sendAt), 'MM/dd/yy hh:mm a')}
            </p>
          )}
          {message.photoUrl && (
            <img
              src={message.photoUrl}
              alt="attached"
              className="photo-preview"
            />
          )}
        </div>
        <Link to="../">
          <button>Back to Text Home</button>
        </Link>
      </div>
    );
  } else {
    return <h4>Message Not Found</h4>;
  }
};

export default TextSuccess;
