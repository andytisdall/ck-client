import { useGetTodaysKitchenVolunteersQuery } from '../../../state/apis/volunteerApi/kitchenApi';
import Loading from '../../reusable/loading/Loading';

const CheckInKitchenVolunteers = () => {
  const { data: volunteers, isLoading } = useGetTodaysKitchenVolunteersQuery();

  if (isLoading) {
    return <Loading />;
  }

  const renderVolunteers = () => {
    if (volunteers) {
      return volunteers.map((vol) => {
        return (
          <li>
            {vol.firstName} | {vol.lastName} | {vol.email} | Agreement Signed:{' '}
            {vol.agreementSigned}
          </li>
        );
      });
    }
    return <li>No volunteers found.</li>;
  };

  return <ul>{renderVolunteers()}</ul>;
};

export default CheckInKitchenVolunteers;
