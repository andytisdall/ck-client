import { connect } from 'react-redux';
import { useEffect } from 'react';

import { getFeedback } from '../../actions';

const Feedback = ({ getFeedback, feedback }) => {
  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  const renderFeedback = () => {
    return feedback.map((fb) => {
      return (
        <li className="feedback-item">
          <div>{fb.date}</div>
          <div>{fb.message}</div>
          <div>{fb.region}</div>
          <div>{fb.sender}</div>
        </li>
      );
    });
  };

  return (
    <div>
      <h3>Feedback</h3>
      <ul>{renderFeedback()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { feedback: Object.values(state.text.feedback) };
};

export default connect(mapStateToProps, { getFeedback })(Feedback);
