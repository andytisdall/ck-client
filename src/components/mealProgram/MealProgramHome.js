import TextButton from '../reusable/TextButton';

const onboardingDescription =
  'Fill out and upload the documents that are required of meal program restaurants';

const resourcesDescription =
  'Access meal guidelines, label templates, and invoices';

const MealProgramHome = () => {
  return (
    <div className="meal-program-home">
      <div className="meal-program-home-text">
        <h3>The Community Kitchens Meal Program Mission</h3>
        <p>
          We partner with over 10 different community groups to distribute meals
          and help them advance their own programs. The quality of CK meals
          helps build trust between the clients who receive our meals and the
          community groups who serve them. This trust helps these community
          groups gain access to provide other important services, from health
          care, to housing services, to CalFresh enrollment. This, in turn,
          helps these community organizations to prosper and advance their own
          missions. We are proud to have partnered with organizations like The
          East Oakland Collective, Homies Empowerment, Roots Clinic, People’s
          Program, The Eat. Learn. Play Bus, Serenity House, Berkeley Free
          Clinic, Kerry’s Kids and many others.
        </p>
      </div>
      <div>
        <TextButton
          to="resources"
          buttonText="Resources"
          descriptionText={resourcesDescription}
        />
        <TextButton
          to="onboarding"
          buttonText="Upload Documents"
          descriptionText={onboardingDescription}
        />
      </div>
      <img
        src="/images/meal-program/meal-program-1.jpg"
        alt="meals for the CK meal program"
        className="meal-program-home-image"
      />
    </div>
  );
};

export default MealProgramHome;
