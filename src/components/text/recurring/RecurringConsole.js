import { connect } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';

import Loading from '../../reusable/Loading';
import useLoading from '../../../hooks/useLoading';
import * as actions from '../../../actions';
import './RecurringConsole.css';

const RecurringConsole = ({
  scheduledTexts,
  getScheduledTexts,
  deleteScheduledText,
}) => {
  const [loading, setLoading] = useLoading();

  useEffect(() => {
    if (!scheduledTexts) {
      setLoading(true);
      getScheduledTexts();
    } else {
      setLoading(false);
    }
  }, [getScheduledTexts, setLoading, scheduledTexts]);

  const messageList = useMemo(() => {
    const list = {};
    if (scheduledTexts) {
      scheduledTexts.forEach((text) => {
        const formattedTime = format(
          utcToZonedTime(text.dateCreated, 'America/Los_Angeles'),
          'M/d/yy h:mm aaa'
        );
        if (!list[text.dateCreated]) {
          list[formattedTime] = [text];
        } else {
          list[formattedTime].push(text);
        }
      });
    }
    return list;
  }, [scheduledTexts]);

  if (loading) {
    return <Loading />;
  }

  if (scheduledTexts && !scheduledTexts.length) {
    return <p>No scheduled texts found</p>;
  }

  return (
    <ul>
      {!!messageList &&
        Object.keys(messageList).map((key) => {
          return (
            <li className="scheduled-text" key={key}>
              Scheduled On:{' '}
              {format(utcToZonedTime(key, 'America/Los_Angeles'), 'MM/dd/yy')}
              <p>{messageList[key][0].body}</p>
              <button
                className="cancel"
                onClick={() =>
                  deleteScheduledText(
                    Object.values(messageList[key]).map((text) => text.sid)
                  )
                }
              >
                cancel
              </button>
            </li>
          );
        })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return { scheduledTexts: state.text.scheduledTexts };
};

export default connect(mapStateToProps, actions)(RecurringConsole);
