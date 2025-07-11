import { useState } from "react";

import { Client } from "../../state/apis/mealProgramApi/doorfrontApi";

const ClientInfo = ({ client }: { client: Client }) => {
  const [cCode, setCcode] = useState(client.cCode || "");

  if (!client) {
    return <div>No Client Found</div>;
  }

  const missingStyle = !cCode ? "doorfront-client-missing" : "";

  return (
    <div className="doorfront-client">
      <div className="doorfront-client-col">
        <div className="doorfront-client-label">Long Barcode:</div>
        <div className="doorfront-client-label">C-Code:</div>
      </div>
      <div className="doorfront-client-col">
        <div className="doorfront-client-value">{client.barcode}</div>
        <input
          className={`doorfront-client-value ${missingStyle}`}
          value={cCode}
          onChange={(e) => setCcode(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ClientInfo;
