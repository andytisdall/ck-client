import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KitchenWaiverSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('../kitchen-agreement');
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-background form-sent">
      <div className="form">
        <h2>Success!</h2>
        <div className="form-item">
          Thank you for signing the CK Kitchen Agreement!
        </div>
      </div>
    </div>
  );
};

export default KitchenWaiverSuccess;
