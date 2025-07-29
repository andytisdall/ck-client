import { useState } from "react";

import { Client } from "../../state/apis/mealProgramApi/doorfrontApi";

interface ClientInfo {
  cCode: string;
  barcode: string;
}

const ClientInformation = ({
  client,
  setClientInfo,
}: {
  client: Client;
  setClientInfo: (cb: (current: ClientInfo) => ClientInfo) => void;
}) => {
  const [cCode, setCcode] = useState(client.cCode || "");
  const [barcode, setBarcode] = useState(client.barcode || "");

  const missingCcodeStyle = !cCode ? "doorfront-client-missing" : "";
  const missingBarCodeStyle = !barcode ? "doorfront-client-missing" : "";

  return (
    <div className="doorfront-client">
      <div className="doorfront-client-row">
        <div className="doorfront-client-label">Barcode:</div>
        <input
          className={`doorfront-client-value ${missingBarCodeStyle}`}
          value={barcode}
          onChange={(e) => {
            setBarcode(e.target.value);
            setClientInfo((current) => ({
              ...current,
              barcode: e.target.value,
            }));
          }}
        />
      </div>
      <div className="doorfront-client-row">
        <div className="doorfront-client-label">Client Number:</div>
        <input
          className={`doorfront-client-value ${missingCcodeStyle}`}
          value={cCode}
          onChange={(e) => {
            setCcode(e.target.value);
            setClientInfo((current) => ({
              ...current,
              cCode: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default ClientInformation;
