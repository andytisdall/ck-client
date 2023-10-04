import { useState } from 'react';
import moment from 'moment';

import {
  useGetFeedbackQuery,
  useDeleteFeedbackMutation,
  FeedbackResponse,
} from '../../../state/apis/feedbackApi';
import Loading from '../../reusable/loading/Loading';
import './Feedback.css';
import CustomText, { ReplyToProps } from '../customText/CustomText';

export const formatNumber = (num: string) => {
  return (
    num.substring(2, 5) + '-' + num.substring(5, 8) + '-' + num.substring(8)
  );
};

const Feedback = () => {
  const [dateRange, setDateRange] = useState('7');
  const [replyTo, setReplyTo] = useState<ReplyToProps>();

  const feedbackQuery = useGetFeedbackQuery();
  const feedback = feedbackQuery.data;
  const [deleteFeedback, deleteFeedbackResult] = useDeleteFeedbackMutation();

  const regions = {
    EAST_OAKLAND: 'East Oakland',
    WEST_OAKLAND: 'West Oakland',
  };

  const renderDateSelector = () => {
    return (
      <div>
        <label>Get all feedback since:</label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="1">1 Day Ago</option>
          <option value="7">1 Week Ago</option>
          <option value="30">1 Month Ago</option>
          <option value="all">All Time</option>
        </select>
      </div>
    );
  };

  const renderResponse = (fb: FeedbackResponse) => {
    if (fb.response?.length) {
      return (
        <div className="feedback">
          <h4>CK Response:</h4>
          <div className="feedback-response">
            {fb.response.map((response, i) => {
              return (
                <ul key={response.date}>
                  <li>
                    <div>{moment(response.date).format('M/D/YY h:m a')}</div>
                    <div>{response.message}</div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const renderFeedback = () => {
    if (Array.isArray(feedback)) {
      return Object.values(feedback)
        .filter((fb) => {
          if (dateRange === 'all') {
            return fb;
          } else {
            return moment(fb.date) > moment().subtract(dateRange, 'days');
          }
        })
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .map((fb) => {
          return (
            <li className="feedback-item" key={fb.id}>
              <div className="feedback-section">
                <div className="feedback-line">
                  <span className="feedback-field">
                    {moment(fb.date).format('MM/DD/YY hh:mm a')}
                  </span>
                </div>

                <div className="feedback-line">
                  <span className="feedback-field">Region:</span>{' '}
                  {regions[fb.region]}
                </div>
                <div className="feedback-line">
                  <span className="feedback-field">Sent by:</span>{' '}
                  {formatNumber(fb.sender)}
                </div>
              </div>
              <div className="feedback-section">
                {!!fb.message && <p>{fb.message}</p>}
              </div>
              <div className="feedback-section">{renderResponse(fb)}</div>

              <div className="feedback-section">
                {fb.images.map((i) => (
                  <img key={i} src={i} alt="attached" />
                ))}
              </div>

              <div className="feedback-section">
                <button onClick={() => setReplyTo(fb)}>
                  Respond to this Message
                </button>
                <button
                  className="feedback-delete cancel"
                  onClick={() => {
                    deleteFeedback(fb.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        });
    }
  };

  const renderCustomText = () => {
    return (
      <div>
        <CustomText replyTo={replyTo} />
        <button
          className="feedback-cancel cancel"
          onClick={() => setReplyTo(undefined)}
        >
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
        <>
          {renderDateSelector()}
          <ul className="feedback-list">
            {feedbackQuery.isLoading || deleteFeedbackResult.isLoading ? (
              <Loading />
            ) : (
              !!feedback && renderFeedback()
            )}
            {!!feedback &&
              !Object.values(feedback).length &&
              'No Feedback to Show.'}
          </ul>
        </>
      )}
    </div>
  );
};

export default Feedback;
