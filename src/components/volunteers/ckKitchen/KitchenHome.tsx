import TextButton from '../../reusable/TextButton';
import { useGetUserQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const KitchenHome = () => {
  const { data, isLoading } = useGetUserQuery();

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const link = data || volunteer ? 'signup/list' : 'signin';

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <TextButton
        descriptionText="Check out when you can volunteer in the CK Kitchen, and sign up online."
        buttonText="Sign Up to Volunteer"
        to={link}
      />
    </div>
  );
};

export default KitchenHome;
