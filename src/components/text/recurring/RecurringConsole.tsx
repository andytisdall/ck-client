import { useMemo } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';

import Loading from '../../reusable/loading/Loading';
import {
  useGetScheduledTextsQuery,
  useDeleteScheduledTextMutation,
  MessageInstance,
} from '../../../state/apis/textApi';

import './RecurringConsole.css';

const RecurringConsole = () => {
  const scheduledTextsQuery = useGetScheduledTextsQuery();
  const scheduledTexts = scheduledTextsQuery.data;

  const [deleteScheduledText, deleteScheduledTextResult] =
    useDeleteScheduledTextMutation();

  const messageList = useMemo(() => {
    const list: Record<string, MessageInstance[]> = {};
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

  if (scheduledTextsQuery.isLoading || deleteScheduledTextResult.isLoading) {
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

export default RecurringConsole;
