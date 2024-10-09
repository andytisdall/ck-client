import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { useGetUserInfoQuery } from '../../state/apis/authApi';

const foodHandler = {
  text: 'Obtain a Food Handler certification and upload the certificate',
  url: 'onboarding/upload-food-handler',
};
const volunteerAgreement = {
  text: 'Sign our volunteer agreement',
  url: 'onboarding/docusign/sign/HC',
};
const homeChefQuiz = {
  text: 'Watch the orientation video and pass the home chef quiz',
  url: 'onboarding/orientation-video',
};

const HomeChefStatus = () => {
  const userInfo = useGetUserInfoQuery().data;

  const [completedActions, incompleteActions] = useMemo(() => {
    let completedActions = [];
    let incompleteActions = [];

    if (!userInfo?.homeChefQuizPassed) {
      incompleteActions.push(homeChefQuiz);
    } else {
      completedActions.push(homeChefQuiz);
    }

    if (!userInfo?.foodHandler) {
      incompleteActions.push(foodHandler);
    } else {
      completedActions.push(foodHandler);
    }

    if (!userInfo?.volunteerAgreement) {
      incompleteActions.push(volunteerAgreement);
    } else {
      completedActions.push(volunteerAgreement);
    }

    return [completedActions, incompleteActions];
  }, [userInfo]);

  const renderAsLi = (action: { text: string; url: string }) => {
    return <li key={action.text}>{action.text}</li>;
  };

  const renderIncomplete = () => {
    if (incompleteActions.length) {
      return (
        <div>
          <p>
            <strong>
              Thank you for signing up to become a CK Home Chef! Please complete
              the following tasks to become an Active Home Chef.
            </strong>
          </p>
          <ul className="incomplete-doc">
            {incompleteActions.map((action: { text: string; url: string }) => {
              return (
                <Link key={action.text} to={action.url}>
                  <li>{action.text}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  const renderComplete = () => {
    if (completedActions.length) {
      return (
        <div>
          <p>You have finished the following tasks:</p>
          <ul className="completed-doc">{completedActions.map(renderAsLi)}</ul>
        </div>
      );
    }
  };

  return (
    <div className="home-chef-status onboarding-checklist">
      {renderIncomplete()}
      {renderComplete()}
    </div>
  );
};

export default HomeChefStatus;
