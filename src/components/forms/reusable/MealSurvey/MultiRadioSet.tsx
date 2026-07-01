import { Question } from "../../meal-program/types";

const MultiRadioSet = ({
  value,
  setValue,
  question,
  columnError,
  error,
}: {
  value: Record<string, number[]>;
  setValue: (newValue: any) => void;
  question: Question;
  columnError: string;
  error?: string;
}) => {
  const renderError = () => {
    if (!Object.keys(value).every((key) => value[key].length < 2)) {
      return columnError;
    }
  };

  const requiredAsterisk = <span className="required">*</span>;

  return (
    <div className={`form-item ${error ? "form-error" : ""}`}>
      <label>
        {question.question}
        {requiredAsterisk}
      </label>
      <div className="form-matrix">
        <div className="form-matrix-row">
          <div className="form-matrix-col"> </div>
          {question.options.map((opt) => (
            <div key={opt}>{opt}</div>
          ))}
        </div>
        {[1, 2, 3, 4, 5, 6, 7].map((number) => (
          <div className="form-matrix-row" key={number}>
            <div className="form-matrix-col">{number}</div>
            {question.options.map((option, index) => {
              const key = `${option.replace(/ /g, "").replace("/", "")}-${number}`;
              return (
                <div key={key}>
                  <input
                    id={key}
                    name={`${number}`}
                    data-testid={key}
                    type="radio"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const newArray = value[index]
                          ? [...value[index], number]
                          : [number];

                        const newValue: Record<string, number[]> = {
                          ...value,
                          [index]: newArray,
                        };
                        const oldOption = Object.keys(value).find((opt) =>
                          value[opt].includes(number),
                        );
                        if (oldOption) {
                          newValue[oldOption] = newValue[oldOption].filter(
                            (n) => n !== number,
                          );
                        }
                        setValue(newValue);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="required">{renderError()}</div>
      <div className="required">{error}</div>
    </div>
  );
};

export default MultiRadioSet;
