import { connect } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';

import { getFeedback, deleteFeedback, editFeedback } from '../../actions';
import './Feedback.css';

const Feedback = ({ getFeedback, feedback, deleteFeedback }) => {
  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  const renderFeedback = () => {
    return feedback
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .map((fb) => {
        return (
          <li className="feedback-item" key={fb.id}>
            <div
              className="feedback-delete"
              onClick={() => deleteFeedback(fb.id)}
            >
              x
            </div>
            <div className="feedback-line">
              {moment(fb.date).format('MM/DD/YY hh:mm a')}
            </div>
            <div className="feedback-line">{fb.message}</div>
            <div className="feedback-line">Region: {fb.region}</div>
            <div className="feedback-line">Sent by: {fb.sender}</div>
          </li>
        );
      });
  };

  return (
    <div>
      <h3>Feedback</h3>
      <ul className="feedback-list">{renderFeedback()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { feedback: Object.values(state.text.feedback) };
};

export default connect(mapStateToProps, { getFeedback, deleteFeedback })(
  Feedback
);
