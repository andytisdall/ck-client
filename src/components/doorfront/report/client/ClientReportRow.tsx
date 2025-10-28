import { useNavigate } from "react-router-dom";

import { Client } from "../../../../state/apis/mealProgramApi/doorfrontApi";

const ClientReportRow = ({ client }: { client: Client }) => {
  const navigate = useNavigate();
  return (
    <div className="meal-report-row">
      <div className="meal-report-col">
        {client.barcodes.map((bc) => (
          <div>{bc}</div>
        ))}
      </div>
      <div className="meal-report-col">{client.cCode}</div>
      <div className="meal-report-col">
        <button onClick={() => navigate(client.id)}>Detail</button>
      </div>
    </div>
  );
};

export default ClientReportRow;
