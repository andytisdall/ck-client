import { Dispatch, SetStateAction } from 'react';

import MultiSelectItem from './MultiSelectItem';

const MultiSelectSet = ({
  setValue,
  options,
  label,
}: {
  setValue: Dispatch<SetStateAction<any>>;
  options: any[];
  label: string;
}) => {
  return (
    <div className="form-item">
      <label>{label}</label>
      {options.map((option, index) => (
        <MultiSelectItem
          value={option}
          setValue={setValue}
          key={`${label}-${index}`}
          id={`${label}-${index}`}
        />
      ))}
    </div>
  );
};

export default MultiSelectSet;
