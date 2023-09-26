import TextButton from '../reusable/TextButton';

const homeChefDescription =
  'A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.';

const ckKitchenDescription = 'Sign up to help out in the CK Kitchen.';

const VolunteersHome = () => {
  return (
    <div>
      <TextButton
        to="../home-chef"
        descriptionText={homeChefDescription}
        buttonText="Home Chef Volunteers"
      />
      <TextButton
        to="ck-kitchen"
        descriptionText={ckKitchenDescription}
        buttonText="CK Kitchen Volunteers"
      />
    </div>
  );
};

export default VolunteersHome;
