import TextButton from '../reusable/TextButton';

const homeChefDescription =
  'A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.';

const ckKitchenDescription = 'Sign up to help out in the CK Kitchen.';

const VolunteersHome = () => {
  return (
    <div className="volunteers-home">
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

      <img
        src="/images/volunteers/volunteer-group.jpg"
        alt="A group of CK Kitchen volunteers"
        className="volunteers-home-img"
      />
    </div>
  );
};

export default VolunteersHome;
