import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import { clearMessages } from '../../../actions';

const FileSuccess = ({ alert, returnLink }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(alert);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Success!</h1>
      <div className="file-success">{message}</div>
      <Link to={returnLink}>
        <button className="nav-button">Back to Onboarding Home</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert.message };
};

export default connect(mapStateToProps, { clearMessages })(FileSuccess);
