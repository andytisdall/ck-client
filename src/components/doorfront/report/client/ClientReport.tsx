import { useNavigate } from "react-router-dom";

import "../DoorfrontReport.css";
import Loading from "../../../reusable/loading/Loading";
import ClientReportRow from "./ClientReportRow";
import { useGetClientsQuery } from "../../../../state/apis/mealProgramApi/doorfrontApi";

const ClientReport = () => {
  const { data: clients, isLoading } = useGetClientsQuery();

  const navigate = useNavigate();

  const renderClients = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!clients?.length) {
      return <div>No clients found.</div>;
    }
    return clients.map((client) => {
      return <ClientReportRow client={client} key={client.id} />;
    });
  };

  return (
    <div className="meal-report">
      <div className="meal-report-row">
        <div className="meal-report-col">Client Number</div>
        <div className="meal-report-col">Barcode</div>
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
