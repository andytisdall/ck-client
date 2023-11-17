import TextButton from '../reusable/TextButton';

const textAlertDescription =
  "Send out a text message to one of the subscriber lists, using a pre-written template, to let people know there's been a food dropoff at a town fridge.";
const customAlertDescription =
  'Send a text message to one of the lists or an individual phone number, not using a template.';
const addNumberDescription =
  'Add a number to one of the subscriber lists, or delete the number from the lists.';
const feedbackDescription =
  'See the messages that people text back to our alert numbers.';
const textRecordsDescription = 'View past text alerts';

const TextHome = () => {
  return (
    <div className="text-main">
      <TextButton
        buttonText="Send a Town Fridge Delivery Alert"
        descriptionText={textAlertDescription}
        to="send-text"
      />
      <TextButton
        buttonText="Send a Custom Alert"
        descriptionText={customAlertDescription}
        to="send-custom-text"
      />
      <TextButton
        buttonText="Add or Remove a Phone Number"
        descriptionText={addNumberDescription}
        to="phone"
      />
      <TextButton
        buttonText="Review Feedback"
        descriptionText={feedbackDescription}
        to="feedback"
      />
      <TextButton
        buttonText="Text Alert Records"
        descriptionText={textRecordsDescription}
        to="text-records"
      />
      <TextButton
        buttonText="Upcoming Text"
        descriptionText="Review texts that are scheduled to be sent"
        to="recurring"
      />
    </div>
  );
};

export default TextHome;
