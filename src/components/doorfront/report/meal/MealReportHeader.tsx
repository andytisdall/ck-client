import { PropsWithChildren } from "react";

export type OrderByField = "date" | "barcode" | "cCode" | "number";

const MealReportHeader = ({
  sortBy,
  orderBy,
  toggleSort,
  setOrderBy,
  children,
}: {
  sortBy: number;
  orderBy: OrderByField;
  setOrderBy: (by: OrderByField) => void;
  toggleSort: () => void;
} & PropsWithChildren) => {
  const arrow = () => {
    return (
      <span className="meal-report-arrow">
        {sortBy === -1 ? <>&uarr;</> : <>&darr;</>}
      </span>
    );
  };

  return (
    <div className="meal-report-row">
      {children}
      <div
        className="meal-report-col meal-report-header-col"
        onClick={() => {
          if (orderBy === "date") {
            toggleSort();
          } else {
            setOrderBy("date");
          }
        }}
      >
        {orderBy === "date" && arrow()}
        <strong>Date</strong>
      </div>
      <div
        className="meal-report-col meal-report-header-col"
        onClick={() => {
          if (orderBy === "number") {
            toggleSort();
          } else {
            setOrderBy("number");
          }
        }}
      >
        {orderBy === "number" && arrow()}
        <strong>Number of Meals</strong>
      </div>
      <div
        className="meal-report-col meal-report-header-col"
        onClick={() => {
          if (orderBy === "barcode") {
            toggleSort();
          } else {
            setOrderBy("barcode");
          }
        }}
      >
        {orderBy === "barcode" && arrow()}
        <strong>Barcode</strong>
      </div>
      <div
        className="meal-report-col meal-report-header-col"
        onClick={() => {
          if (orderBy === "cCode") {
            toggleSort();
          } else {
            setOrderBy("cCode");
          }
        }}
      >
        {orderBy === "cCode" && arrow()}
        <strong>Client ID</strong>
      </div>
    </div>
  );
};

export default MealReportHeader;
