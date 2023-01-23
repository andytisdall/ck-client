import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';

import Loading from '../reusable/Loading';
import { getFeedback, deleteFeedback } from '../../actions';
import './Feedback.css';

const Feedback = ({ getFeedback, feedback, deleteFeedback }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  useEffect(() => {
    if (!feedback) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [feedback]);

  const formatNumber = (num) => {
    return (
      num.substring(2, 5) + '-' + num.substring(5, 8) + '-' + num.substring(8)
    );
  };

  const regions = {
    EAST_OAKLAND: 'East Oakland',
    WEST_OAKLAND: 'West Oakland',
  };

  const renderFeedback = () => {
    return Object.values(feedback)
      .sort((a, b) => (a.date > b.date ? -1 : 1))
      .map((fb) => {
        return (
          <li className="feedback-item" key={fb.id}>
            <div
              className="feedback-delete"
              onClick={() => {
                setLoading(true);
                deleteFeedback(fb.id);
              }}
            >
              x
            </div>
            <div className="feedback-line">
              <span className="feedback-field">
                {moment(fb.date).format('MM/DD/YY hh:mm a')}
              </span>
            </div>
            <div className="feedback-line">
              <p>{fb.message}</p>
            </div>
            {fb.images.map((i) => (
              <img src={i} alt="attached" />
            ))}
            <div className="feedback-line">
              <span className="feedback-field">Region:</span>{' '}
              {regions[fb.region]}
            </div>
            <div className="feedback-line">
              <span className="feedback-field">Sent by:</span>{' '}
              {formatNumber(fb.sender)}
            </div>
          </li>
        );
      });
  };

  return (
    <div>
      <h3>Feedback</h3>

      <ul className="feedback-list">
        {loading && <Loading />}
        {!loading && feedback && renderFeedback()}
        {feedback && !Object.values(feedback).length && 'No Feedback to Show.'}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { feedback: state.text.feedback };
};

export default connect(mapStateToProps, { getFeedback, deleteFeedback })(
  Feedback
);
