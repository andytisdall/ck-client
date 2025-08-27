import { addMonths, format, getDate, subMonths } from "date-fns";

export const formatMealDate = (date: string) => {
  return format(new Date(date), "M/d/yy h:mm aaa");
};

export const mealIsWithinMonth = (date: string) => {
  let startDate: Date;
  let endDate: Date;

  const today = new Date();
  const todaysDate = getDate(today);
  if (todaysDate < 15) {
    const lastMonth = subMonths(today, 1);
    lastMonth.setDate(15);
    lastMonth.setHours(0);
    startDate = lastMonth;
    today.setDate(14);
    today.setHours(23);
    endDate = today;
  } else {
    const nextMonth = addMonths(today, 1);
    nextMonth.setDate(14);
    nextMonth.setHours(23);
    endDate = nextMonth;
    today.setDate(15);
    today.setHours(0);
    startDate = today;
  }

  const mealDate = new Date(date);

  return startDate <= mealDate && mealDate <= endDate;
};

export const monthlyMealMax = 30;
export const dailyMealMax = 4;
