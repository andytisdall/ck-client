import {
  useRef,
  useCallback,
  useState,
  useMemo,
  FormEventHandler,
} from 'react';
import { useNavigate } from 'react-router-dom';

import './Quiz.css';
import {
  useGetQuizQuestionsQuery,
  useSubmitQuizAnswersMutation,
} from '../../../../state/apis/volunteerApi';
import QuizQuestion from './QuizQuestion';
import Loading from '../../../reusable/loading/Loading';

const ANIMATION_DURATION = 200;

const Quiz = () => {
  const [page, setPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { data: questions } = useGetQuizQuestionsQuery();

  const [submitQuizAnswers, { isLoading }] = useSubmitQuizAnswersMutation({
    fixedCacheKey: 'home-chef-quiz',
  });

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const formattedAnswers = Object.keys(userAnswers).map((index) => ({
      index: parseInt(index),
      answer: userAnswers[index],
    }));
    submitQuizAnswers(formattedAnswers)
      .unwrap()
      .then(() => {
        navigate('../quiz-results');
      });
  };

  const transitionAnimation = useCallback((action: 'add' | 'sub') => {
    const modifier = action === 'add' ? 1 : -1;

    const width = window.outerWidth;

    formRef.current?.animate(
      [{}, { transform: `translateX(${width * -modifier}px)` }],
      ANIMATION_DURATION
    );
    setPage((page) => {
      setTimeout(() => {
        formRef.current?.animate(
          [
            { transform: `translateX(${width * -modifier}px)` },
            { display: 'none' },
          ],
          10
        );
        formRef.current?.animate(
          [{ transform: `translateX(${width * modifier}px)` }, {}],
          ANIMATION_DURATION + 50
        );
      }, ANIMATION_DURATION);
      return page + modifier;
    });
  }, []);

  const nextPageBtn = useMemo(() => {
    const nextBtnDisabled = userAnswers[page] === undefined;

    const style = nextBtnDisabled ? 'hc-quiz-btn-disabled' : '';

    const submitBtnDisabled =
      !Object.values(userAnswers).every((answer) => answer !== undefined) ||
      Object.values(userAnswers).length !== questions?.length;

    return questions && page < questions.length - 1 ? (
      <button
        onClick={(e) => {
          e.preventDefault();
          transitionAnimation('add');
        }}
        disabled={nextBtnDisabled}
        className={style}
      >
        Next Question
      </button>
    ) : (
      <button
        type="submit"
        className={submitBtnDisabled ? 'hc-quiz-btn-disabled' : ''}
      >
        Submit Quiz
      </button>
    );
  }, [page, questions, transitionAnimation, userAnswers]);

  const prevPageBtn = useMemo(() => {
    return (
      page !== 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            transitionAnimation('sub');
          }}
        >
          Previous Question
        </button>
      )
    );
  }, [page, transitionAnimation]);

  return (
    <div>
      <h2>Home Chef Onboarding Quiz</h2>
      <form className="hc-quiz-form" ref={formRef} onSubmit={onSubmit}>
        <QuizQuestion
          page={page}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="hc-quiz-form-btns">
            {prevPageBtn}
            {nextPageBtn}
          </div>
        )}
      </form>
    </div>
  );
};

export default Quiz;
