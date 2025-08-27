const MealCounter = ({
  meals,
  setMeals,
  limitReachedAlert,
}: {
  meals: number;
  setMeals: (setState: (current: number) => number) => void;
  limitReachedAlert?: string;
}) => {
  return (
    <div className="doorfront-col">
      <b>Client is receiving</b>
      <h3 className="doorfront-meal-count">{`${meals} meal${meals === 1 ? "" : "s"}`}</h3>
      {!!limitReachedAlert && (
        <div className="doorfront-alert">{limitReachedAlert}</div>
      )}

      <div className="doorfront-btns">
        <button
          className={
            "doorfront-btn-sub doorfront-btn " +
            (meals === 1 ? "btn-inactive" : "")
          }
          onClick={() => {
            if (meals > 1) {
              setMeals((current) => current - 1);
            }
          }}
        >
          -
        </button>
        <button
          className={
            "doorfront-btn-add doorfront-btn " +
            (!!limitReachedAlert ? "btn-inactive" : "")
          }
          onClick={() => {
            if (!limitReachedAlert) {
              setMeals((current) => current + 1);
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MealCounter;
