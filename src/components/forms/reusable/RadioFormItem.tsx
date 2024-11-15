const RadioFormItem = ({
  value,
  setValue,
  name,
  id,
  language,
}: {
  value: string | boolean | number;
  setValue: (newValue: string | boolean | number) => void;
  name: string;
  id: string;
  language: 'English' | 'Spanish';
}) => {
  let label = value;

  if (language === 'English') {
    if (value === true) {
      label = 'Yes';
    }
    if (value === false) {
      label = 'No';
    }
  }

  if (language === 'Spanish') {
    if (value === true) {
      label = 'Si';
    }
    if (value === false) {
      label = 'No';
    }
  }

  return (
    <>
      <div className="form-checkbox">
        <input
          id={id}
          name={name}
          type="radio"
          onChange={(e) => {
            if (e.target.checked) {
              setValue(value);
            }
          }}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
};

export default RadioFormItem;
