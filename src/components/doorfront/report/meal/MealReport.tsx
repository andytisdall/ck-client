import { format } from "date-fns";
import { useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "../DoorfrontReport.css";
import {
  ClientMeal,
  useLazyGetMealsQuery,
  useLogMealsMutation,
} from "../../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../../reusable/loading/Loading";
import { useEffect, useState } from "react";
import MealReportRow from "./MealReportRow";
import MealReportFooter from "./MealReportFooter";
import { OrderByField } from "./MealReportHeader";
import MealReportHeader from "./MealReportHeader";

const MealReport = () => {
  const today = format(new Date(), "yyyy-MM-dd");

  const [mealsToLog, setMealsToLog] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [orderBy, setOrderBy] = useState<OrderByField>("date");
  const [sortBy, setSortBy] = useState(1);

  const [getMeals, { data: meals, isFetching }] = useLazyGetMealsQuery();
  const [logMeals, { isLoading }] = useLogMealsMutation();

  const navigate = useNavigate();

  const checkAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMeals({
      startDate,
      endDate,
    });
  }, [getMeals, startDate, endDate]);

  const sortedMeals = useMemo(() => {
    if (meals) {
      return [...meals].sort((a: ClientMeal, b: ClientMeal) => {
        if (orderBy === "date") {
          return new Date(a.date) > new Date(b.date) ? -sortBy : sortBy;
        }
        if (orderBy === "number") {
          return a.amount > b.amount ? -sortBy : sortBy;
        }
        if (orderBy === "cCode") {
          if (a.client.cCode && b.client.cCode) {
            return a.client.cCode > b.client.cCode ? -sortBy : sortBy;
          }
          if (a.client.cCode) {
            return -sortBy;
          }
          if (b.client.cCode) {
            return sortBy;
          }
          return 1;
        }
        if (orderBy === "barcode") {
          if (a.client.barcode && b.client.barcode) {
            return a.client.barcode > b.client.barcode ? -sortBy : sortBy;
          }
          if (a.client.barcode) {
            return -sortBy;
          }
          if (b.client.barcode) {
            return sortBy;
          }
          return 1;
        }
        return 1;
      });
    }
  }, [meals, orderBy, sortBy]);

  const mealRows = useMemo(() => {
    if (isFetching) {
      return <Loading />;
    }
    if (!sortedMeals?.length) {
      return (
        <div className="meal-report-warning">No meals found for this date.</div>
      );
    }
    return sortedMeals.map((meal) => {
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
  }, [isFetching, mealsToLog, sortedMeals]);

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
        <MealReportHeader
          sortBy={sortBy}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          toggleSort={() => setSortBy((current) => -current)}
        >
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
        </MealReportHeader>
        {mealRows}
        {!!meals && <MealReportFooter meals={meals} />}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <button onClick={() => logMeals({ mealIds: mealsToLog })}>
          Log Selected
        </button>
      )}
      <div className="doorfront-submit-row">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MealReport;
