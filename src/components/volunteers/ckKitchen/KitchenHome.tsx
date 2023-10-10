import TextButton from '../../reusable/TextButton';

const KitchenHome = () => {
  return (
    <div>
      <TextButton
        descriptionText="Check out when you can volunteer in the CK Kitchen, and sign up online."
        buttonText="Sign Up to Volunteer"
        to="signup/list"
      />
    </div>
  );
};

export default KitchenHome;
