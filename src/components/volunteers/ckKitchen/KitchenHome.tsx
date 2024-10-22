import TextButton from '../../reusable/TextButton';
import { useGetUserQuery } from '../../../state/apis/authApi';
import Loading from '../../reusable/loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { useGetCampaignsQuery } from '../../../state/apis/volunteerApi';

const KitchenHome = () => {
  const { data, isLoading } = useGetUserQuery();

  const { volunteer } = useSelector((state: RootState) => ({
    volunteer: state.volunteer.volunteer,
  }));

  const { data: campaigns } = useGetCampaignsQuery();

  const kitchenId = campaigns?.find(
    (cam) => cam.name === 'CK Kitchen Volunteers'
  )?.id;

  const link =
    data || volunteer ? `signup/${kitchenId}` : `signin/${kitchenId}`;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="volunteers-kitchen-home volunteers-body">
      <img
        src="/images/volunteers/sandwich-prep.jpeg"
        alt="CK Kitchen volunteers preparing sandwiches"
        className="volunteers-kitchen-home-photo volunteers-photo-frame"
      />
      <TextButton
        descriptionText="Check out when you can volunteer in the CK Kitchen, and sign up online. If you already have a shift booked, you can view it here, and modify or cancel it if you need to."
        buttonText="Sign Up to Volunteer / See your shifts"
        to={link}
      />
    </div>
  );
};

export default KitchenHome;
