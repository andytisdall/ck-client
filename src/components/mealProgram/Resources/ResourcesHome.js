import TextButton from '../../reusable/TextButton';

const invoicingDescription = '';
const packagingDescription = '';
const mealGuidelinesDescription = '';

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
