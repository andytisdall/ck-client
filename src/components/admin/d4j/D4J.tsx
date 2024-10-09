import PrizeDrawing from './PrizeDrawing';

import {
  useLazyDeleteAndyQuery,
  useSetStyleWeekActiveMutation,
  useGetStyleWeekActiveQuery,
  useDeclareWinnerMutation,
} from '../../../state/apis/d4jApi';
import Loading from '../../reusable/loading/Loading';

const D4J = () => {
  const [deleteAndy] = useLazyDeleteAndyQuery();
  const { data } = useGetStyleWeekActiveQuery();
  const [setStyleWeekActive] = useSetStyleWeekActiveMutation();
  const [declareWinner, { data: winners }] = useDeclareWinnerMutation();

  const contestAction = data?.contestActive ? 'Deactivate' : 'Activate';
  const styleMonthAction = data?.styleMonthActive ? 'Deactivate' : 'Activate';

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <button onClick={() => deleteAndy()}>Delete Andy</button>

      <button
        onClick={() =>
          setStyleWeekActive({
            contestActive: !data.contestActive,
            styleMonthActive: data.styleMonthActive,
          })
        }
      >
        {contestAction} Contest
      </button>
      <button
        onClick={() =>
          setStyleWeekActive({
            contestActive: data.contestActive,
            styleMonthActive: !data.styleMonthActive,
          })
        }
      >
        {styleMonthAction} Style Month
      </button>

      <button onClick={() => declareWinner()}>Declare Winner</button>

      {winners &&
        winners.map((winner) => (
          <div key={winner}>
            <h3>{winner}</h3>
          </div>
        ))}

      <PrizeDrawing />
    </>
  );
};

export default D4J;
