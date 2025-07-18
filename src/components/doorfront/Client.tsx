import { useState } from "react";

import { addZerosToCcode } from "./ScanBarcode";
import { Client } from "../../state/apis/mealProgramApi/doorfrontApi";

const ClientInfo = ({
  client,
  setCcode,
}: {
  client: Client;
  setCcode: (code: string) => void;
}) => {
  const [code, setCode] = useState(client.cCode || "");

  const missingStyle = !code ? "doorfront-client-missing" : "";

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
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setCcode(addZerosToCcode(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default ClientInfo;
