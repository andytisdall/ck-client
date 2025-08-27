import { useGetUserQuery } from "../../../state/apis/authApi";
import TextButton from "../../reusable/TextButton";

const suppliesDescription =
  "Order to-go containers and meal labels to pick up at the CK Kitchen";

const recipesDescription =
  "Browse the CK recipe library, featuring dishes from some of Oakland's most beloved restaurants and some of our top home chefs, or add a recipe of your own.";

const slackDescription =
  "Our Slack channel is a message board where Home Chefs can ask questions, share info, and communicate with Community Kitchens staff.";

const labelDescription = "Print out labels to put on your meal packaging.";

const ResourcesHome = () => {
  const { data: user } = useGetUserQuery();
  return (
    <div className="resources">
      <div className="resources-list">
        {user?.admin && (
          <TextButton
            to="supplies"
            buttonText="Order Home Chef Supplies"
            descriptionText={suppliesDescription}
          />
        )}
        <TextButton
          to="labels"
          buttonText="Label Templates"
          descriptionText={labelDescription}
        />
        <TextButton
          to="recipes"
          buttonText="Recipes"
          descriptionText={recipesDescription}
        />
        <TextButton
          to="https://join.slack.com/t/community-kitchens/shared_invite/zt-27qcrhzdc-Fn0AZbI1auiiymFId9sYjw"
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

export default ResourcesHome;

// ingredient label template
