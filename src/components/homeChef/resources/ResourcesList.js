import TextButton from '../../reusable/TextButton';

const recipesDescription =
  "Browse the CK recipe library, featuring dishes from some of Oakland's most beloved restaurants and some of our top home chefs, or add a recipe of your own.";

const ResourcesList = () => {
  return (
    <div>
      <TextButton
        to="recipes"
        buttonText="Recipes"
        descriptionText={recipesDescription}
      />
    </div>
  );
};

export default ResourcesList;

// recipes
// ingredient label template
// slack channel invite link
// sign up link
// training videos
