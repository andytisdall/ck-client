import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { clearMessages } from '../../actions';

const TextSuccess = ({ alert, clearMessages }) => {
  useEffect(() => {
    return () => clearMessages();
  }, [clearMessages]);

  return (
    <div>
      <h1>Success!</h1>
      <div className="file-success">
        <p>You have successfully sent this text:</p>
        <p>Region: {alert.data.region}</p>
        <p>{alert.data.message}</p>
      </div>
      <Link to="../">
        <button>Back to Text Home</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert };
};

export default connect(mapStateToProps, { clearMessages })(TextSuccess);
