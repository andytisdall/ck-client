const RadioFormItem = ({
  value,
  setValue,
  name,
  id,
}: {
  value: string | boolean | number;
  setValue: () => void;
  name: string;
  id: string;
}) => {
  let label = value;
  return (
    <div className="form-checkbox">
      <input
        id={id}
        name={name}
        type="radio"
        onChange={(e) => {
          if (e.target.checked) {
            setValue();
          }
        }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioFormItem;
