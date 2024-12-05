import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useLazyGetVolunteerQuery } from '../../../state/apis/volunteerApi';

const SignSuccess = ({ returnLink }: { returnLink: string }) => {
  const { email } = useParams();

  const [getVolunteer] = useLazyGetVolunteerQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      getVolunteer(email);
    }
    setTimeout(() => {
      navigate(returnLink);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Signing Completed</h3>
    </div>
  );
};

export default SignSuccess;
