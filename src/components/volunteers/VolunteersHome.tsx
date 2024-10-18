import TextButton from '../reusable/TextButton';
import EventsList from './events/EventsList';

const homeChefDescription =
  'A hub for CK Home Chefs to get started in the program, sign up for Town Fridge Deliveries, and access resources like recipes.';

const ckKitchenDescription = 'Sign up to help out in the CK Kitchen.';

const VolunteersHome = () => {
  const renderOngoing = () => {
    return (
      <div className="volunteers-home-section">
        <div className="volunteers-home-section-title">
          Ongoing Volunteer Programs
        </div>
        <div className="volunteers-home-section-body">
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
      </div>
    );
  };

  return (
    <div className="volunteers-home">
      {renderOngoing()}
      <EventsList />
      <img
        src="/images/volunteers/volunteer-group.jpg"
        alt="A group of CK Kitchen volunteers"
        className="volunteers-home-img volunteers-photo-frame"
      />
    </div>
  );
};

export default VolunteersHome;
