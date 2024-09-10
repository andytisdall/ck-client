import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { useGetUserInfoQuery } from '../../state/apis/authApi';

const HomeChefStatus = () => {
  const userInfo = useGetUserInfoQuery().data;

  const foodHandler =
    'Obtain a Food Handler certification and upload the certificate';
  const volunteerAgreement = 'Sign our volunteer agreement';
  const homeChefQuiz =
    'Watch the orientation video and pass the home chef quiz';

  const [completedActions, incompleteActions] = useMemo(() => {
    let completedActions = [];
    let incompleteActions = [];

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

    if (!userInfo?.homeChefQuizPassed) {
      incompleteActions.push(homeChefQuiz);
    } else {
      completedActions.push(homeChefQuiz);
    }

    return [completedActions, incompleteActions];
  }, [userInfo]);

  const renderAsLi = (text: string) => {
    return <li key={text}>{text}</li>;
  };

  const renderIncomplete = () => {
    if (incompleteActions.length) {
      return (
        <div>
          <p>
            You have to complete the following tasks before you can sign up for
            Town Fridge deliveries:
          </p>
          <ul className="incomplete-doc">
            {incompleteActions.map((text: string) => {
              const linkUrl =
                text === homeChefQuiz
                  ? 'onboarding/orientation-video'
                  : 'onboarding/documents';
              return (
                <Link key={text} to={linkUrl}>
                  <li>{text}</li>
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
