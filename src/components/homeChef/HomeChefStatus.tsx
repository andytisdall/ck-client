import { useGetUserInfoQuery } from "../../state/apis/authApi";
import Status, { Task } from "../reusable/status/Status";

const HomeChefStatus = () => {
  const { data: userInfo } = useGetUserInfoQuery();

  const foodHandler: Task = {
    text: "Obtain a Food Handler certification and upload the certificate",
    url: "onboarding/upload-food-handler",
    completed: userInfo?.foodHandler || false,
  };
  const volunteerAgreement: Task = {
    text: "Sign our volunteer agreement",
    url: "onboarding/sign/HC",
    completed: userInfo?.homeChefAgreement || false,
  };
  const homeChefQuiz: Task = {
    text: "Watch the orientation video and take the home chef quiz",
    url: "onboarding/orientation-video",
    completed: userInfo?.homeChefQuizPassed || false,
  };

  const tasks = [foodHandler, volunteerAgreement, homeChefQuiz];

  return (
    <Status tasks={tasks}>
      <strong>
        Thank you for signing up to become a CK Home Chef! Please complete the
        following tasks to become an Active Home Chef.
      </strong>
    </Status>
  );
};

export default HomeChefStatus;
