import { format } from "date-fns";

import { ClientMeal } from "../../../state/apis/mealProgramApi/doorfrontApi";

const MealReportRow = ({
  meal,
  selected,
  setSelected,
}: {
  meal: ClientMeal;
  selected: boolean;
  setSelected: (checked: boolean) => void;
}) => {
  const clientId = meal.client.cCode;

  const renderCheck = () => {
    if (meal.logged) {
      return <>&check;</>;
    }
    if (clientId) {
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
    <div className="meal-report-row">
      <div className="meal-report-checkbox">{renderCheck()}</div>
      <div className="meal-report-col">
        {format(new Date(meal.date), "M/d/yy")}
      </div>
      <div className="meal-report-col">{meal.amount}</div>
      <div className="meal-report-col">{clientId}</div>
    </div>
  );
};

export default MealReportRow;
