import { Question } from "../../meal-program/types";

const MultiRadioSet = ({
  value,
  setValue,
  question,
}: {
  value: Record<string, number[]>;
  setValue: (newValue: any) => void;
  question: Question;
}) => {
  console.log(value);

  const renderError = () => {
    if (
      !Object.keys(value).every(
        (key) => value[key].length > 0 && value[key].length < 2,
      )
    ) {
      return "Error";
    }
  };

  return (
    <div className="form-item">
      <label>{question.question}</label>
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
              const key = `${option}-${index}`;
              return (
                <div key={key}>
                  <input
                    id={key}
                    name={`${number}`}
                    type="radio"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const newValue = value[option]
                          ? [...value[option], number]
                          : [number];
                        setValue({
                          ...value,
                          [option]: newValue,
                        });
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {renderError()}
    </div>
  );
};

export default MultiRadioSet;
