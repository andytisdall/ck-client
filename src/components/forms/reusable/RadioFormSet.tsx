import RadioFormItem from './RadioFormItem';
import { Question } from '../mealSurveyQuestions';

const RadioFormSet = ({
  name,
  setValue,
  question,
  language,
}: {
  name: string;
  setValue: (newValue: any) => void;
  question: Question;
  language: 'English' | 'Spanish';
}) => {
  const options = question.options ? question.options[language] : [true, false];
  return (
    <div className="form-item">
      <label>{question[language]}</label>
      {options.map((option, index) => (
        <RadioFormItem
          value={option}
          setValue={setValue}
          name={name}
          key={`${name}-${index}`}
          id={`${name}-${index}`}
          language={language}
        />
      ))}
    </div>
  );
};

export default RadioFormSet;
