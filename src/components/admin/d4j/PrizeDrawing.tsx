import { useDrawPrizeMutation } from '../../../state/apis/d4jApi';
import Loading from '../../reusable/loading/Loading';

const PrizeDrawing = () => {
  const [drawPrize, { isLoading, data }] = useDrawPrizeMutation();

  const checkIns = data?.numberOfCheckIns;

  const first = data?.firstPrize;
  const second = data?.secondPrize;
  const third = data?.thirdPrize;

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
            <div>First Prize Winner: </div>
            <div className="d4j-item">
              {first?.firstName} {first?.lastName}
            </div>

            <div>Second Prize Winner: </div>
            <div className="d4j-item">
              {second?.firstName} {second?.lastName}
            </div>

            <div>Third Prize Winner: </div>
            <div className="d4j-item">
              {third?.firstName} {third?.lastName}
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
