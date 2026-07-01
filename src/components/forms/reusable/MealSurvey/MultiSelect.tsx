import { Dispatch, SetStateAction, useRef } from "react";

import MultiSelectItem from "./MultiSelectItem";
import { Question } from "../../meal-program/types";

const MultiSelectSet = ({
  setValue,
  question,
  customAnswer,
  setCustomAnswer,
  error,
}: {
  setValue: Dispatch<SetStateAction<any[]>>;
  question: Question;
  customAnswer?: string;
  setCustomAnswer?: (answer: string) => void;
  error?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { options } = question;

  const requiredAsterisk = <span className="required">*</span>;

  return (
    <div className={`form-item ${error ? "form-error" : ""}`}>
      <label>
        {question.question}
        {requiredAsterisk}
      </label>
      {options.map((option, index) => {
        const key = `${question.question}-${index}`;

        if (setCustomAnswer && index === options.length - 1) {
          return (
            <div className="form-checkbox" key={key}>
              <MultiSelectItem
                value={option}
                addValue={() => {
                  inputRef.current?.focus();
                  setValue((current) => [...current, index]);
                }}
                removeValue={() =>
                  setValue((current) => current.filter((val) => val !== index))
                }
                id={key}
              />
              <input
                className="form-other-input"
                onChange={(e) => setCustomAnswer(e.target.value)}
                value={customAnswer}
                ref={inputRef}
                maxLength={99}
              />
            </div>
          );
        }
        return (
          <MultiSelectItem
            value={option}
            addValue={() => setValue((current) => [...current, index])}
            removeValue={() =>
              setValue((current) => current.filter((val) => val !== index))
            }
            key={key}
            id={key}
          />
        );
      })}
      <div className="required">{error}</div>
    </div>
  );
};

export default MultiSelectSet;
