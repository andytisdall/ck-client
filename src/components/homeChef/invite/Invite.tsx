import { useState, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../reusable/loading/Loading';
import './Invite.css';
import { useSendInviteMutation } from '../../../state/apis/volunteerApi';
import { useGetUserInfoQuery } from '../../../state/apis/authApi';

const Invite = () => {
  const [sendInvite, { isLoading }] = useSendInviteMutation();
  const userInfo = useGetUserInfoQuery().data;

  const defaultMessage = `Hi, this is ${userInfo?.firstName}. I want to tell you about a great way to directly help the people in our Oakland community.
 
I'm a member of the Community Kitchens Home Chef program.  Home chefs cook delicious, restaurant quality meals in bulk at home. Using packaging materials provided by Community Kitchens, we bring these meals to one of the publicly accessible town fridges in Oakland, to be eaten by whoever needs them.

Community Kitchens lets community members know when and what kind of food drop offs are happening, and gives home chefs a donation receipt for tax deductions. They also organize the distribution of meals and help chefs work together to get what they need to produce nutritious meals.

CK Home Chef lets people provide food directly to the people that need it most. If you want to know more, you can visit https://www.ckoakland.org/volunteer.

Thanks for your time!
${userInfo?.firstName}
  `;
  const defaultSubject = `${userInfo?.firstName} ${userInfo?.lastName} invites you to become a home chef!`;

  const [recipients, setRecipients] = useState(['']);
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState(defaultMessage);

  const navigate = useNavigate();

  const renderInputs = () => {
    return recipients.map((rec, i) => {
      return (
        <li key={'emailRecipient' + i} className="form-horizontal">
          <input
            type="email"
            value={rec}
            required
            className="invite-email"
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

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    sendInvite({ recipients, message, subject })
      .unwrap()
      .then(() => navigate('..'));
  };

  const addField = () => {
    const newArr = [...recipients, ''];
    setRecipients(newArr);
  };

  const deleteField = (i: number) => {
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
        {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
      </form>
    </div>
  );
};

export default Invite;
