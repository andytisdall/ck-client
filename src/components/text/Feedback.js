import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';

import Loading from '../reusable/Loading';
import * as actions from '../../actions';
import './Feedback.css';
import useLoading from '../../hooks/useLoading';
import CustomText from './CustomText';

export const formatNumber = (num) => {
  return (
    num.substring(2, 5) + '-' + num.substring(5, 8) + '-' + num.substring(8)
  );
};

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

  const regions = {
    EAST_OAKLAND: 'East Oakland',
    WEST_OAKLAND: 'West Oakland',
  };

  const renderResponse = (fb) => {
    if (fb.response?.length) {
      return (
        <>
          <h4>CK Response:</h4>
          <div className="feedback-response">
            {fb.response.map((response, i) => {
              return (
                <ul key={response.date}>
                  <li>{moment(response.date).format('M/D/YY h:m a')}</li>
                  <li>{response.message}</li>
                </ul>
              );
            })}
          </div>
        </>
      );
    }
  };

  const renderFeedback = () => {
    return Object.values(feedback)
      .sort((a, b) => (a.date > b.date ? -1 : 1))
      .map((fb) => {
        return (
          <li className="feedback-item" key={fb.id}>
            <div className="feedback-line">
              <span className="feedback-field">
                {moment(fb.date).format('MM/DD/YY hh:mm a')}
              </span>
            </div>
            <div className="feedback-line">
              <p>{fb.message}</p>
            </div>
            {fb.images.map((i) => (
              <img key={i} src={i} alt="attached" />
            ))}
            <div className="feedback-line">
              <span className="feedback-field">Region:</span>{' '}
              {regions[fb.region]}
            </div>
            <div className="feedback-line">
              <span className="feedback-field">Sent by:</span>{' '}
              {formatNumber(fb.sender)}
            </div>
            {renderResponse(fb)}
            <div className="feedback-control">
              <button onClick={() => setReplyTo(fb)}>
                Respond to this Message
              </button>
              <button
                className="feedback-delete"
                onClick={() => {
                  setLoading(true);
                  deleteFeedback(fb.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        );
      });
  };

  const renderCustomText = () => {
    return (
      <div>
        <CustomText replyTo={replyTo} />
        <button className="feedback-cancel" onClick={() => setReplyTo(null)}>
          Cancel
        </button>
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
