const NumberEntry = ({
  setValue,
  question,
  required,
  name,
  value,
}: {
  value?: string;
  setValue: (date: string) => void;
  question: string;
  required?: boolean;
  name: string;
}) => {
  return (
    <div className="form-item">
      <label htmlFor={name}>
        {question}
        {required && <span className="required">*</span>}
      </label>
      <div className="form-checkbox">
        $
        <input
          type="number"
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NumberEntry;
