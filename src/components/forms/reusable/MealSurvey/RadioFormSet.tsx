import { useRef } from "react";

import RadioFormItem from "./RadioFormItem";
import { Question } from "../../meal-program/types";

const RadioFormSet = ({
  name,
  setValue,
  question,
  customAnswer,
  setCustomAnswer,
  error,
}: {
  name: string;
  setValue: (newValue: any) => void;
  question: Question;
  customAnswer?: string;
  setCustomAnswer?: (answer: string) => void;
  error?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const requiredAsterisk = <span className="required">*</span>;

  return (
    <div className={`form-item ${error ? "form-error" : ""}`}>
      <label>
        {question.question}
        {requiredAsterisk}
      </label>
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
                  return setValue(index);
                }}
                name={name}
                id={id}
              />
              <input
                className="form-other-input"
                onChange={(e) => setCustomAnswer(e.target.value)}
                value={customAnswer}
                ref={inputRef}
                maxLength={100}
              />
            </div>
          );
        }
        return (
          <RadioFormItem
            value={option}
            setValue={() => setValue(index)}
            name={name}
            key={key}
            id={id}
          />
        );
      })}
      <div className="required">{error}</div>
    </div>
  );
};

export default RadioFormSet;
