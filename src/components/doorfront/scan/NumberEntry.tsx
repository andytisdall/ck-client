const numberArray: number[] = [];
for (let i = 1; i < 10; i++) {
  numberArray.push(i);
}
numberArray.push(10);
numberArray.push(0);
numberArray.push(11);

const NumberEntry = ({
  addNumber,
  deleteNumber,
  close,
}: {
  addNumber: (num: number) => void;
  deleteNumber: () => void;
  close: () => void;
}) => {
  const generateNumbers = () => {
    return numberArray.map((num) => {
      if (num === 10) {
        return (
          <div
            key={num}
            onClick={deleteNumber}
            className="doorfront-number-pad-digit doorfront-number-pad-yellow"
          >
            &larr;
          </div>
        );
      }
      if (num === 11) {
        return (
          <div
            key={num}
            onClick={close}
            className="doorfront-number-pad-digit doorfront-number-pad-red"
          >
            X
          </div>
        );
      }
      return (
        <div
          key={num}
          onClick={() => addNumber(num)}
          className="doorfront-number-pad-digit"
        >
          {num}
        </div>
      );
    });
  };
  return <div className="doorfront-number-pad">{generateNumbers()}</div>;
};

export default NumberEntry;
