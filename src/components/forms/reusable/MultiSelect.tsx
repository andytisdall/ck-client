import { Dispatch, SetStateAction } from 'react';

import MultiSelectItem from './MultiSelectItem';
import { Question } from './RadioFormSet';

const MultiSelectSet = ({
  setValue,
  question,
  label,
  language,
}: {
  setValue: Dispatch<SetStateAction<string[]>>;
  question: Question;
  label: string;
  language: 'English' | 'Spanish';
}) => {
  const options = question.options![language];

  return (
    <div className="form-item">
      <label>{label}</label>
      {options.map((option, index) => (
        <MultiSelectItem
          value={option}
          addValue={() =>
            setValue((current) => [
              ...current,
              question.options!.English[index],
            ])
          }
          removeValue={() =>
            setValue((current) =>
              current.filter((val) => val !== question.options!.English[index])
            )
          }
          key={`${label}-${index}`}
          id={`${label}-${index}`}
        />
      ))}
    </div>
  );
};

export default MultiSelectSet;
