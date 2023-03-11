import { connect } from 'react-redux';
import { useState } from 'react';

import * as actions from '../../../actions';
import useLoading from '../../../hooks/useLoading';
import Loading from '../../reusable/Loading';
import './Invite.css';

const defaultMessage = 'Please consider being a CK Home Chef!';
const defaultSubject = "You're invited to become a home chef";

const Invite = ({ sendInvite }) => {
  const [recipients, setRecipients] = useState(['']);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState(defaultMessage);

  const [loading, setLoading] = useLoading();

  const renderInputs = () => {
    return recipients.map((rec, i) => {
      return (
        <div key={rec + i} className="form-horizontal">
          <input
            type="email"
            value={rec}
            required
            onChange={(e) => {
              const newArr = [...recipients];
              newArr.splice(i, 1, e.target.value);
              setRecipients(newArr);
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
        </div>
      );
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendInvite(recipients, message);
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
      <form onSubmit={onSubmit} className="invite-form">
        {renderInputs()}
        <div className="invite-add-section" onClick={addField}>
          Add another email address
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

export default connect(null, actions)(Invite);
