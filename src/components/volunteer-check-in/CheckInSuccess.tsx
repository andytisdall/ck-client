import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const CheckInSuccess = () => {
  const navigate = useNavigate();

  const { shiftId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      navigate('../list/' + shiftId);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>You have successfully checked in!</h3>
    </div>
  );
};

export default CheckInSuccess;
