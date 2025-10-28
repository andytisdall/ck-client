import { useState } from "react";
import { format, getDate, getMonth, getYear } from "date-fns";
import MonthlyReport from "./MonthlyReport";

const MonthlyReportHeader = () => {
  const today = new Date();
  const todaysDate = getDate(today);
  let currentMonth = getMonth(today) + 1;
  if (todaysDate > 14) {
    currentMonth += 1;
  }

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(getYear(today));

  const startDate = new Date(
    month === 1 ? year - 1 : year,
    month === 1 ? 12 : month - 2,
    15
  );
  const endDate = new Date(month === 12 ? year + 1 : year, month - 1, 14);

  const controls = (
    <div>
      <label>Month:</label>
      <select
        value={month}
        onChange={(e) => setMonth(parseInt(e.target.value))}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
          return (
            <option key={m} value={m}>
              {m}
            </option>
          );
        })}
      </select>
      <label>Year:</label>
      <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
        {[2025, 2026].map((y) => {
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
    </div>
  );

  return (
    <div>
      {controls}
      <h3>
        Monthly Report: {format(startDate, "M/d/yy")} -{" "}
        {format(endDate, "M/d/yy")}
      </h3>

      <MonthlyReport month={month} year={year} />
    </div>
  );
};

export default MonthlyReportHeader;
