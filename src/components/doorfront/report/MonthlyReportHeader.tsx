import { useEffect, useState } from "react";
import { format, getDate, getMonth, getYear } from "date-fns";
import MonthlyReport from "./MonthlyReport";

const MonthlyReportHeader = () => {
  const today = new Date();
  const todaysDate = getDate(today);
  let currentMonth = getMonth(today) + 1;
  let currentYear = getYear(today);
  if (todaysDate > 14) {
    if (currentMonth < 12) {
      currentMonth += 1;
    } else {
      currentMonth = 1;
      currentYear += 1;
    }
  }

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    setStartDate(
      format(
        new Date(
          month === 1 ? year - 1 : year,
          month === 1 ? 11 : month - 2,
          15
        ),
        "yyyy-MM-dd"
      )
    );
    setEndDate(format(new Date(year, month - 1, 14), "yyyy-MM-dd"));
  }, [month, year]);

  const monthControls = (
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

  const dayControls = (
    <div>
      <label>Date Range:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      -{" "}
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );

  return (
    <div className="meal-report">
      <h2>Monthly Report</h2>
      {monthControls}
      {dayControls}
      <MonthlyReport startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default MonthlyReportHeader;
