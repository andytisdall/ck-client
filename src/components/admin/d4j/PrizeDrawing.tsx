import { useDrawPrizeMutation } from '../../../state/apis/d4jApi';
import Loading from '../../reusable/loading/Loading';

const PrizeDrawing = () => {
  const [drawPrize, { isLoading, data }] = useDrawPrizeMutation();

  const winner = data?.contact;
  const checkIns = data?.numberOfCheckIns;

  return (
    <div>
      <h2>
        Click the button below to randomly choose a winner from all valid D4J
        check-ins
      </h2>
      <button onClick={() => drawPrize()} className="d4j-btn">
        Draw Winner
      </button>
      {isLoading && <Loading />}
      {!!data && (
        <>
          <div className="admin-item">
            <div>Winner: </div>
            <div className="d4j-item">
              {winner?.firstName} {winner?.lastName}
            </div>

            <div className="d4j-item">
              <div>Total number of check ins in this batch:</div>
              <div>{checkIns}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PrizeDrawing;
