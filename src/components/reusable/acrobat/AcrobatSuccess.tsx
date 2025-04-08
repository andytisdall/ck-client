import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from 'react-router-dom';
import { useEffect } from 'react';

import { useUpdateContactMutation } from '../../../state/apis/acrobatApi';
import Loading from '../loading/Loading';
import { useLazyGetVolunteerQuery } from '../../../state/apis/volunteerApi';

const AcrobatSuccess = ({ returnLink }: { returnLink: string }) => {
  const { doc, email } = useParams();
  const searchParams = useSearchParams()[0];

  const status = searchParams.get('agreementStatus');

  const [updateContact, { isLoading }] = useUpdateContactMutation();
  const [getVolunteer, { isLoading: volIsLoading }] =
    useLazyGetVolunteerQuery();

  const navigate = useNavigate();

  useEffect(() => {
    const updateContactAndGetVolunteer = async () => {
      await updateContact({ doc, email });
      if (email) {
        await getVolunteer(email);
      }
      navigate(returnLink);
    };
    if (status === 'completed') {
      updateContactAndGetVolunteer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {status === 'completed' ? (
        <h3>Signing Successful</h3>
      ) : (
        <div>
          <h3>Signing Failed</h3>
          <Link to={returnLink}>
            <button>Continue</button>
          </Link>
        </div>
      )}
      {(isLoading || volIsLoading) && <Loading />}
    </div>
  );
};

export default AcrobatSuccess;
