import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import "../DoorfrontReport.css";
import Loading from "../../../reusable/loading/Loading";
import ClientReportRow from "./ClientReportRow";
import { useGetClientsQuery } from "../../../../state/apis/mealProgramApi/doorfrontApi";

const ClientReport = () => {
  const [orderBy, setOrderBy] = useState<"cCode" | "barcode">("cCode");
  const [sortBy, setSortBy] = useState(1);

  const { data: clients, isLoading } = useGetClientsQuery();

  const navigate = useNavigate();

  const sortedClients = useMemo(() => {
    if (clients) {
      return [...clients].sort(
        (
          a: { cCode?: string; barcode?: string[] },
          b: { cCode?: string; barcode?: string[] }
        ) => {
          if (a[orderBy] && b[orderBy]) {
            return a[orderBy]! > b[orderBy]! ? -sortBy : sortBy;
          }
          if (a[orderBy]) {
            return -sortBy;
          }
          if (b[orderBy]) {
            return sortBy;
          }
          return 1;
        }
      );
    }
  }, [clients, orderBy, sortBy]);

  const renderClients = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!sortedClients?.length) {
      return <div>No clients found.</div>;
    }
    return sortedClients.map((client) => {
      return <ClientReportRow client={client} key={client.id} />;
    });
  };

  const arrow = () => {
    return (
      <span className="meal-report-arrow">
        {sortBy === -1 ? <>&uarr;</> : <>&darr;</>}
      </span>
    );
  };

  return (
    <div className="meal-report">
      <div className="meal-report-row">
        <div
          className="meal-report-col meal-report-header-col"
          onClick={() => {
            if (orderBy === "barcode") {
              setSortBy((current) => -current);
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
              setSortBy((current) => -current);
            } else {
              setOrderBy("cCode");
            }
          }}
        >
          {orderBy === "cCode" && arrow()}
          <strong>Client ID</strong>
        </div>
      </div>
      {renderClients()}
      <div className="doorfront-submit-row">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ClientReport;
