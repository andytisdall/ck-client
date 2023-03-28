import TextButton from '../../reusable/TextButton';
import './Resources.css';

const recipesDescription =
  "Browse the CK recipe library, featuring dishes from some of Oakland's most beloved restaurants and some of our top home chefs, or add a recipe of your own.";

const slackDescription =
  'Our Slack channel is a message board where Home Chefs can ask questions, share info, and communicate with Community Kitchens staff.';

const ResourcesList = () => {
  return (
    <div className="resources">
      <div>
        <TextButton
          to="recipes"
          buttonText="Recipes"
          descriptionText={recipesDescription}
        />
        <TextButton
          to="https://community-kitchens.slack.com/"
          buttonText="Get Connected to our Slack Channel"
          descriptionText={slackDescription}
          outside
        />
      </div>
      <img
        className="resources-image"
        src="/images/home-chef/croissants.jpg"
        alt="Croissant and Omelet"
      />
    </div>
  );
};

export default ResourcesList;

// ingredient label template
