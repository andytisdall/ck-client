const YesOrNo = ({
  setValue,
  question,
  required,
  name,
}: {
  setValue: (value: boolean) => void;
  question: string;
  required?: boolean;
  name: string;
}) => {
  return (
    <div className="form-item">
      <label>
        {question}
        {required && <span className="required">*</span>}
      </label>

      <div className="form-checkbox">
        <input
          id={`${name}-yes`}
          name={name}
          type="radio"
          onChange={(e) => {
            setValue(e.target.checked);
          }}
        />
        <label htmlFor={`${name}-yes`}>Yes</label>
      </div>
      <div className="form-checkbox">
        <input
          id={`${name}-no`}
          name={name}
          type="radio"
          onChange={(e) => {
            setValue(!e.target.checked);
          }}
        />
        <label htmlFor={`${name}-no`}>No</label>
      </div>
    </div>
  );
};

export default YesOrNo;
