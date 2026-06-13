import { useRef } from "react";

import RadioFormItem from "./RadioFormItem";

export interface Question {
  English: string;
  Spanish: string;
  options?: { English: string[]; Spanish: string[] };
}

const RadioFormSet = ({
  name,
  setValue,
  question,
  language,
  customAnswer,
  setCustomAnswer,
}: {
  name: string;
  setValue: (newValue: any) => void;
  question: Question;
  language: "English" | "Spanish";
  customAnswer?: string;
  setCustomAnswer?: (answer: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const options = question.options ? question.options[language] : [true, false];

  return (
    <div className="form-item">
      <label>{question[language]}</label>
      {options.map((option, index) => {
        const key = `${name}-${index}`;
        const id = `${name}-${index}`;

        if (setCustomAnswer && index === options.length - 1) {
          return (
            <div className="form-checkbox">
              <RadioFormItem
                value={option}
                setValue={() => {
                  inputRef.current?.focus();
                  return setValue(question.options?.English[index] || option);
                }}
                name={name}
                key={key}
                id={id}
                language={language}
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
            setValue={() =>
              setValue(question.options?.English[index] || option)
            }
            name={name}
            key={key}
            id={id}
            language={language}
          />
        );
      })}
    </div>
  );
};

export default RadioFormSet;
