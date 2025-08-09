import { format } from "date-fns";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../DoorfrontReport.css";
import { useLazyGetMealsQuery } from "../../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../../reusable/loading/Loading";
import { useEffect, useState } from "react";
import MealReportRow from "./MealReportRow";

const MealReport = () => {
  const today = format(new Date(), "yyyy-MM-dd");

  const [mealsToLog, setMealsToLog] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [getMeals, { data: meals, isFetching }] = useLazyGetMealsQuery();

  const navigate = useNavigate();

  const checkAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMeals({
      startDate,
      endDate,
    });
  }, [getMeals, startDate, endDate]);

  const renderMeals = () => {
    if (isFetching) {
      return <Loading />;
    }
    if (!meals?.length) {
      return <div>No meals found for this date.</div>;
    }
    return meals.map((meal) => {
      const selected = mealsToLog.includes(meal.id);
      return (
        <MealReportRow
          meal={meal}
          key={meal.id}
          selected={selected}
          setSelected={(checked) => {
            if (checked) {
              setMealsToLog((current) => [...current, meal.id]);
            } else {
              setMealsToLog((current) => current.filter((m) => m !== meal.id));
              if (checkAllRef.current?.checked) {
                checkAllRef.current.checked = false;
              }
            }
          }}
        />
      );
    });
  };

  return (
    <div>
      <div className="meal-reports-dates">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <div>-</div>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="meal-report">
        <div className="meal-report-row">
          <div className="meal-report-checkbox">
            <input
              ref={checkAllRef}
              type="checkbox"
              onChange={(e) => {
                if (meals) {
                  if (e.target.checked) {
                    setMealsToLog(
                      meals.filter((m) => m.client.cCode).map((m) => m.id)
                    );
                  } else {
                    setMealsToLog([]);
                  }
                }
              }}
            />
          </div>
          <div className="meal-report-col">
            <strong>Date</strong>
          </div>
          <div className="meal-report-col">
            <strong>Number of Meals</strong>
          </div>
          <div className="meal-report-col">
            <strong>Client ID</strong>
          </div>
        </div>
        {renderMeals()}
      </div>
      <button onClick={() => {}}>Log Selected</button>
      <div className="doorfront-submit-row">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MealReport;
