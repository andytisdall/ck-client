import { format } from 'date-fns-tz';
import { useDispatch } from 'react-redux';

import { setAlert } from '../../../state/apis/slices/alertSlice';
import Loading from '../../reusable/loading/Loading';
import {
  useGetScheduledTextsQuery,
  useDeleteScheduledTextMutation,
} from '../../../state/apis/textApi';

import './RecurringConsole.css';

const RecurringConsole = () => {
  const { data: scheduledTexts, isFetching } = useGetScheduledTextsQuery();

  const [deleteScheduledText, deleteScheduledTextResult] =
    useDeleteScheduledTextMutation();

  const dispatch = useDispatch();

  if (isFetching || deleteScheduledTextResult.isLoading) {
    return <Loading />;
  }

  if (!isFetching && scheduledTexts && !Object.keys(scheduledTexts).length) {
    return <p>No scheduled texts found</p>;
  }

  return (
    <>
      <h2>Upcoming Texts</h2>
      <ul>
        {!!scheduledTexts &&
          Object.keys(scheduledTexts).map((key) => {
            return (
              <li className="scheduled-text" key={key}>
                Created On:{' '}
                {format(
                  new Date(scheduledTexts[key][0].dateCreated),
                  'MM/dd/yy'
                )}
                <p>{scheduledTexts[key][0].body}</p>
                <p>Status: {scheduledTexts[key][0].status}</p>
                <button
                  className="cancel"
                  onClick={() => {
                    deleteScheduledText(
                      scheduledTexts[key].map((text) => text.sid)
                    )
                      .unwrap()
                      .then(() => dispatch(setAlert('Message Canceled')));
                  }}
                >
                  cancel
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default RecurringConsole;
