const MultiSelectItem = ({
  value,
  setValue,
  id,
}: {
  value: string | boolean | number;
  setValue: (setValueFn: (current: any[]) => any[]) => void;
  id: string;
}) => {
  return (
    <>
      <div className="form-checkbox">
        <input
          id={id}
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setValue((current) => [...current, value]);
            } else {
              setValue((current) => current.filter((val) => val !== value));
            }
          }}
        />
        <label htmlFor={id}>{value}</label>
      </div>
    </>
  );
};

export default MultiSelectItem;
