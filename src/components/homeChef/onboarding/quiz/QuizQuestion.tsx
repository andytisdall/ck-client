import { useGetQuizQuestionsQuery } from "../../../../state/apis/volunteerApi/homeChefApi";
import Loading from "../../../reusable/loading/Loading";

const QuizQuestion = ({
  page,
  userAnswers,
  setUserAnswers,
}: {
  page: number;
  userAnswers: Record<string, number>;
  setUserAnswers: (newState: Record<string, number>) => void;
}) => {
  const { data: questions, isLoading } = useGetQuizQuestionsQuery();

  const question = questions ? questions[page] : undefined;

  const q = question?.question;

  const answers = question?.answers.map((ans, i) => {
    const selected = userAnswers[page] === i;
    return (
      <div key={ans} className="hc-quiz-option">
        <input
          type="radio"
          value={i}
          name={"question-" + page}
          id={`question-${page}-${i}`}
          checked={selected}
          onChange={(e) =>
            setUserAnswers({
              ...userAnswers,
              [page]: parseInt(e.target.value),
            })
          }
        />
        <label htmlFor={`question-${page}-${i}`}>{ans}</label>
      </div>
    );
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!q) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1 className="hc-quiz-question-header">Question {page + 1}</h1>
      <p className="hc-quiz-question">{q}</p>
      <div>{answers}</div>
    </div>
  );
};

export default QuizQuestion;
