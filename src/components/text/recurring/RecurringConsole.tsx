import { format } from 'date-fns-tz';

import Loading from '../../reusable/loading/Loading';
import {
  useGetScheduledTextsQuery,
  useDeleteScheduledTextMutation,
} from '../../../state/apis/textApi';

import './RecurringConsole.css';

const RecurringConsole = () => {
  const { data: scheduledTexts, isLoading } = useGetScheduledTextsQuery();

  const [deleteScheduledText, deleteScheduledTextResult] =
    useDeleteScheduledTextMutation();

  if (isLoading || deleteScheduledTextResult.isLoading) {
    return <Loading />;
  }

  if (!isLoading && scheduledTexts && !Object.keys(scheduledTexts).length) {
    return <p>No scheduled texts found</p>;
  }

  return (
    <ul>
      {!!scheduledTexts &&
        Object.keys(scheduledTexts).map((key) => {
          return (
            <li className="scheduled-text" key={key}>
              Created On:{' '}
              {format(new Date(scheduledTexts[key][0].dateCreated), 'MM/dd/yy')}
              <p>{scheduledTexts[key][0].body}</p>
              <button
                className="cancel"
                onClick={() =>
                  deleteScheduledText(
                    Object.values(scheduledTexts[key]).map((text) => text.sid)
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
