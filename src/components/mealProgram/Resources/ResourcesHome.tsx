import TextButton from '../../reusable/TextButton';

const invoicingDescription =
  'Instructions for invoicing CK fior the meals you make and an example invoice';
const packagingDescription =
  'Meal label templates and recommendations for meal packaging';
const mealGuidelinesDescription =
  "Guidelines for making meals for CK's Youth Meal Program and Encampment Meal Program";

const ResourcesHome = () => {
  return (
    <div>
      <h2>Meal Program Resources for Restaurants</h2>
      <div>
        <TextButton
          to="meal-guidelines"
          buttonText="Meal Guidelines"
          descriptionText={mealGuidelinesDescription}
        />
        <TextButton
          to="packaging"
          buttonText="Packaging"
          descriptionText={packagingDescription}
        />
        <TextButton
          to="invoicing"
          buttonText="Invoicing"
          descriptionText={invoicingDescription}
        />
      </div>
    </div>
  );
};

export default ResourcesHome;
