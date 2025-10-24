import { useState, useCallback, JSX } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import {
  startOfMonth,
  getDay,
  getDaysInMonth,
  addDays,
  subMonths,
  addMonths,
} from "date-fns";

import "./Calendar.css";

type RenderItems = (date: string) => JSX.Element[];

const Calendar = ({ renderItems }: { renderItems: RenderItems }) => {
  const [month, setMonth] = useState(new Date());

  const getDays = useCallback(() => {
    const days = [];
    const firstDay = startOfMonth(month);
    const dayOfWeek = getDay(firstDay);

    for (let i = 0; i < dayOfWeek; i++) {
      days.push(null);
    }
    const numberOfDays = getDaysInMonth(month);

    for (let i = 0; i < numberOfDays; i++) {
      const date = addDays(firstDay, i);

      days.push(
        format(
          utcToZonedTime(new Date(date), "America/Los_Angeles"),
          "yyyy-MM-dd"
        )
      );
    }
    return days.map((d, i) => {
      if (!d) {
        return <div key={i}></div>;
      }
      const items = renderItems(d);

      return (
        <div className="calendar-date" key={d}>
          <div className="calendar-date-number">
            {format(utcToZonedTime(d, "America/Los_Angeles"), "d")}
          </div>
          {items}
        </div>
      );
    });
  }, [month, renderItems]);

  const calendar = () => {
    return (
      <>
        <div className="calendar-days">
          <div className="calendar-day">Sun</div>
          <div className="calendar-day">Mon</div>
          <div className="calendar-day">Tue</div>
          <div className="calendar-day">Wed</div>
          <div className="calendar-day">Thu</div>
          <div className="calendar-day">Fri</div>
          <div className="calendar-day">Sat</div>
        </div>
        <div className="calendar">{getDays()}</div>
      </>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-top">
        <div className="calendar-header">
          <div
            className="calendar-header-arrow"
            onClick={() => {
              const lastMonth = subMonths(month, 1);
              setMonth(lastMonth);
            }}
          >
            &larr;
          </div>
          <div className="calendar-header-month">
            {format(month, "MMMM yyyy")}
          </div>
          <div
            className="calendar-header-arrow"
            onClick={() => {
              const nextMonth = addMonths(month, 1);
              setMonth(nextMonth);
            }}
          >
            &rarr;
          </div>
        </div>
        <div className="calendar-header">
          <button
            onClick={() => setMonth(new Date())}
            className="calendar-set-current"
          >
            Set to Current Month
          </button>
        </div>
      </div>
      {calendar()}
    </div>
  );
};

export default Calendar;
