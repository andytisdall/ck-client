import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { Client } from "../../../../state/apis/mealProgramApi/doorfrontApi";

export const formatMealDate = (date: string) => {
  const dateArray = new Date(date).toUTCString().split(" ");
  return format(
    new Date([dateArray[1], dateArray[2], dateArray[3]].join(" ")),
    "M/d/yy"
  );
};

const ClientReportRow = ({ client }: { client: Client }) => {
  const navigate = useNavigate();
  return (
    <div className="meal-report-row">
      <div className="meal-report-col">{client.cCode}</div>
      <div className="meal-report-col">{client.barcode}</div>
      <div className="meal-report-col">
        <button onClick={() => navigate(client.id)}>Detail</button>
      </div>
    </div>
  );
};

export default ClientReportRow;
