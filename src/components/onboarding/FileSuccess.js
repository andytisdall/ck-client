import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import { clearMessages } from '../../actions';

const FileSuccess = ({ alert, clearMessages }) => {
  useEffect(() => () => clearMessages(), [clearMessages]);

  return (
    <div>
      <h1>Success!</h1>
      <div className="file-success">
        You have successfully uploaded {alert.data} file(s).
      </div>
      <Link to="../">
        <button>Back to Onboarding Home</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert };
};

export default connect(mapStateToProps, { clearMessages })(FileSuccess);
