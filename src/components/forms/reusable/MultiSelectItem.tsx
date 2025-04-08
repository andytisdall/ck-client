const MultiSelectItem = ({
  value,
  addValue,
  removeValue,
  id,
}: {
  value: string | boolean | number;
  addValue: () => void;
  removeValue: () => void;
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
              addValue();
            } else {
              removeValue();
            }
          }}
        />
        <label htmlFor={id}>{value}</label>
      </div>
    </>
  );
};

export default MultiSelectItem;
