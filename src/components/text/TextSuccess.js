import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const TextSuccess = ({ message }) => {
  return (
    <div>
      <h1>Success!</h1>
      <div className="file-success">
        <p>You have successfully sent this text:</p>
        <p>Region: {message.region}</p>
        <p>{message.message}</p>
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
