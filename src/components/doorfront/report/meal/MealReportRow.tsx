import { ClientMeal } from "../../../../state/apis/mealProgramApi/doorfrontApi";
import { formatMealDate } from "../../doorfrontFunctions";
import IncorrectId from "./IncorrectId";

const MealReportRow = ({
  meal,
  selected,
  setSelected,
}: {
  meal: ClientMeal;
  selected: boolean;
  setSelected: (checked: boolean) => void;
}) => {
  const { client } = meal;
  const dateString = formatMealDate(meal.date);

  const renderCheck = () => {
    if (meal.logged) {
      return <div className="meal-report-check">&#9989;</div>;
    }
    if (client?.cCode) {
      return (
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => setSelected(e.target.checked)}
        />
      );
    }
  };
  return (
    <div className="meal-report-row-container">
      <div className="meal-report-row">
        <div className="meal-report-checkbox">{renderCheck()}</div>
        <div className="meal-report-col">{dateString}</div>
        <div className="meal-report-col">{meal.amount}</div>
        <div className="meal-report-col doorfront-barcode-list">
          {client?.barcode.map((bc) => (
            <div className="meal-report-col" key={bc}>
              {bc}
            </div>
          ))}
        </div>
        <div
          className="meal-report-col meal-report-col-clickable"
          onClick={(e) => {
            const text = e.currentTarget.textContent;
            if (text) {
              navigator.clipboard.writeText(text);
              setSelected(true);
            }
          }}
        >
          {client?.cCode}
        </div>
      </div>
      {!!client && <IncorrectId client={client} />}
    </div>
  );
};

export default MealReportRow;
