import { connect } from 'react-redux';
import { useState } from 'react';

import * as actions from '../../../actions';
import useLoading from '../../../hooks/useLoading';
import Loading from '../../reusable/Loading';
import './Invite.css';

const Invite = ({ sendInvite, user }) => {
  const defaultMessage = `This is a message from ${user?.firstName}. Please consider being a CK Home Chef!`;
  const defaultSubject = `${user?.firstName} is inviting you to become a home chef`;

  const [recipients, setRecipients] = useState(['']);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState(defaultMessage);

  const [loading, setLoading] = useLoading();

  const renderInputs = () => {
    return recipients.map((rec, i) => {
      return (
        <li key={'emailRecipient' + i} className="form-horizontal">
          <input
            type="email"
            value={rec}
            required
            onChange={(e) => {
              setRecipients([
                ...recipients.slice(0, i),
                e.target.value,
                ...recipients.slice(i + 1),
              ]);
            }}
          />
          {i > 0 ? (
            <div
              className="invite-delete-section"
              onClick={() => deleteField(i)}
            >
              x
            </div>
          ) : null}
        </li>
      );
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendInvite(recipients, message, subject);
  };

  const addField = () => {
    const newArr = [...recipients, ''];
    setRecipients(newArr);
  };

  const deleteField = (i) => {
    recipients.splice(i, 1);
    setRecipients([...recipients]);
  };

  return (
    <div>
      <h2>Send your friends an invitation to be a CK Home Chef</h2>
      <form onSubmit={onSubmit} className="invite-form">
        <h4>Enter the email address of the person(s) you're inviting</h4>
        <ul>{renderInputs()}</ul>
        <div className="invite-add-section" onClick={addField}>
          + Add another email address
        </div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          className="invite-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        {loading ? <Loading /> : <input type="submit" />}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, actions)(Invite);
