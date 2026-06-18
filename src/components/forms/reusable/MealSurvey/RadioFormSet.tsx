import { useRef } from "react";

import RadioFormItem from "./RadioFormItem";
import { Question } from "../../meal-program/types";

// export interface Question {
//   English: string;
//   Spanish: string;
//   options?: { English: string[]; Spanish: string[] };
// }

const RadioFormSet = ({
  name,
  setValue,
  question,
  customAnswer,
  setCustomAnswer,
}: {
  name: string;
  setValue: (newValue: any) => void;
  question: Question;
  customAnswer?: string;
  setCustomAnswer?: (answer: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="form-item">
      <label>{question.question}</label>
      {question.options.map((option, index) => {
        const key = `${name}-${index}`;
        const id = `${name}-${index}`;

        if (setCustomAnswer && index === question.options.length - 1) {
          return (
            <div className="form-checkbox" key={key}>
              <RadioFormItem
                value={option}
                setValue={() => {
                  inputRef.current?.focus();
                  return setValue(
                    question.options ? question.options[index] : option,
                  );
                }}
                name={name}
                id={id}
              />
              <input
                className="form-other-input"
                onChange={(e) => setCustomAnswer(e.target.value)}
                value={customAnswer}
                ref={inputRef}
              />
            </div>
          );
        }
        return (
          <RadioFormItem
            value={option}
            setValue={() => setValue(question.options[index])}
            name={name}
            key={key}
            id={id}
          />
        );
      })}
    </div>
  );
};

export default RadioFormSet;
