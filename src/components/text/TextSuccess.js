import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { format } from 'date-fns-tz';

const TextSuccess = ({ message }) => {
  return (
    <div>
      <h1>Success!</h1>
      <div className="file-success">
        <p>You have successfully sent this text:</p>
        <p>Region: {message.region}</p>
        <p>{message.message}</p>
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
};

const mapStateToProps = (state) => {
  return { message: state.text.sent };
};

export default connect(mapStateToProps)(TextSuccess);
