import TextButton from '../../reusable/TextButton';
import './Resources.css';

const recipesDescription =
  "Browse the CK recipe library, featuring dishes from some of Oakland's most beloved restaurants and some of our top home chefs, or add a recipe of your own.";

const slackDescription =
  'Our Slack channel is a message board where Home Chefs can ask questions, share info, and communicate with Community Kitchens staff.';

const labelDescription = 'Print out labels to put on your meal packaging.';

const ResourcesList = () => {
  return (
    <div className="resources">
      <div className="resources-list">
        <TextButton
          to="recipes"
          buttonText="Recipes"
          descriptionText={recipesDescription}
        />
        <TextButton
          to="labels"
          buttonText="Label Templates"
          descriptionText={labelDescription}
        />
        <TextButton
          to="https://community-kitchens.slack.com/"
          buttonText="Get Connected to our Slack Channel"
          descriptionText={slackDescription}
          outside
        />
      </div>
      {/* <div className="resources-right-col"> */}
      <img
        className="resources-image"
        src="/images/home-chef/croissants.jpg"
        alt="Croissant and Omelet"
      />
      {/* </div> */}
    </div>
  );
};

export default ResourcesList;

// ingredient label template
