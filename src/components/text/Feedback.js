import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';

import Loading from '../reusable/Loading';
import * as actions from '../../actions';
import './Feedback.css';
import useLoading from '../../hooks/useLoading';
import CustomText from './CustomText';

const Feedback = ({ getFeedback, feedback, deleteFeedback }) => {
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useLoading();

  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  useEffect(() => {
    if (!feedback) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [feedback, setLoading]);

  const formatNumber = (num) => {
    return (
      num.substring(2, 5) + '-' + num.substring(5, 8) + '-' + num.substring(8)
    );
  };

  const regions = {
    EAST_OAKLAND: 'East Oakland',
    WEST_OAKLAND: 'West Oakland',
  };

  const renderResponse = (fb) => {
    if (fb.response?.length) {
      return (
        <div className="feedback-response">
          <h4>Response</h4>
          {fb.response.map((response) => {
            return (
              <div key={moment(response.date).format('M/D/YY h:m')}>
                <div>{response.date}</div>
                <div>{response.message}</div>
              </div>
            );
          })}
        </div>
      );
    }
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
            {renderResponse()}
            <button
              onClick={() =>
                setReplyTo({
                  message: fb.message,
                  number: fb.sender,
                  id: fb.id,
                })
              }
            >
              Respond to this Message
            </button>
          </li>
        );
      });
  };

  const renderCustomText = () => {
    return (
      <div>
        <CustomText replyTo={replyTo} />
        <button onClick={() => setReplyTo(null)}>Cancel</button>
      </div>
    );
  };

  return (
    <div>
      <h3>Feedback</h3>
      {replyTo ? (
        renderCustomText()
      ) : (
        <ul className="feedback-list">
          {loading && <Loading />}
          {!loading && feedback && renderFeedback()}
          {feedback &&
            !Object.values(feedback).length &&
            'No Feedback to Show.'}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { feedback: state.text.feedback };
};

export default connect(mapStateToProps, actions)(Feedback);
