import { Link } from "react-router-dom";
import {
  useSubmitQuizAnswersMutation,
  useGetQuizQuestionsQuery,
} from "../../../../state/apis/volunteerApi/homeChefApi";

const QuizResults = () => {
  const [, { data: results }] = useSubmitQuizAnswersMutation({
    fixedCacheKey: "home-chef-quiz",
  });

  const { data: questions } = useGetQuizQuestionsQuery();

  const result = results?.passed ? "passed" : "did not pass";

  const renderWrongAnswers = () => {
    if (questions && results?.wrongAnswers.length) {
      return (
        <div className="hc-quiz-wrong">
          <p>Questions answered incorrectly:</p>
          <ul>
            {results.wrongAnswers.map((ans, i) => {
              return (
                <div key={ans}>
                  <li>
                    {questions[ans].question}
                    {results.passed && results.rightAnswers && (
                      <div className="hc-quiz-right">
                        Correct Answer:
                        <span className="hc-quiz-right-answer">
                          {results.rightAnswers[i]}
                        </span>
                      </div>
                    )}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  const renderRetakeLink = () => {
    if (!results?.passed) {
      return (
        <Link to="../quiz">
          <button>Retake Quiz</button>
        </Link>
      );
    } else {
      return (
        <Link to="..">
          <button>Continue Onboarding</button>
        </Link>
      );
    }
  };

  if (!results) {
    return (
      <div>
        <p>Quiz results could not be found.</p>
      </div>
    );
  }

  const scoreColor = results.passed ? "hc-quiz-passed" : "hc-quiz-failed";

  return (
    <div className="hc-quiz-form">
      <h1 className="hc-quiz-question-header">
        Home Chef Onboarding Quiz Results
      </h1>
      <h2 className={`hc-quiz-score ${scoreColor}`}>
        Score: {results.score}/{results.score + results.wrongAnswers.length}
      </h2>
      <p className="hc-quiz-question">You {result} the quiz</p>
      {renderRetakeLink()}
      {renderWrongAnswers()}
    </div>
  );
};

export default QuizResults;
