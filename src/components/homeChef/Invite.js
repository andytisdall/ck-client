import { connect } from 'mongoose';
import { useState, useEffect } from 'react';

import * as actions from '../../actions';

const defaultMessage = 'Please consider being a CK Home Chef!';

const Invite = ({ sendInvite, error }) => {
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState(defaultMessage);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <form onSubmit={() => sendInvite(recipients, message)}></form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.error.error };
};

export default connect(mapStateToProps, actions)(Invite);
