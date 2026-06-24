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
  setValue: Dispatch<SetStateAction<string[]>>;
  question: Question;
  customAnswer?: string;
  setCustomAnswer?: (answer: string) => void;
  error?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { options } = question;

  return (
    <div className={`form-item ${error ? "form-error" : ""}`}>
      <label>{question.question}</label>
      {options.map((option, index) => {
        const key = `${question.question}-${index}`;

        if (setCustomAnswer && index === options.length - 1) {
          return (
            <div className="form-checkbox" key={key}>
              <MultiSelectItem
                value={option}
                addValue={() =>
                  setValue((current) => [...current, options[index]])
                }
                removeValue={() =>
                  setValue((current) =>
                    current.filter((val) => val !== options[index]),
                  )
                }
                id={key}
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
          <MultiSelectItem
            value={option}
            addValue={() => setValue((current) => [...current, options[index]])}
            removeValue={() =>
              setValue((current) =>
                current.filter((val) => val !== options[index]),
              )
            }
            key={key}
            id={key}
          />
        );
      })}
    </div>
  );
};

export default MultiSelectSet;
