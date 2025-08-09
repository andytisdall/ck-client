import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Client } from "../../../state/apis/mealProgramApi/doorfrontApi";
import { useEditClientMutation } from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";

interface ClientInfo {
  cCode: string;
  barcode: string;
}

const ClientInformation = ({
  client,
  setClientInfo,
}: {
  client: Client;
  setClientInfo?: (cb: (current: ClientInfo) => ClientInfo) => void;
}) => {
  const [cCode, setCcode] = useState(client.cCode || "");
  const [barcode, setBarcode] = useState(client.barcode || "");

  const [editClient, { isLoading }] = useEditClientMutation();

  const navigate = useNavigate();

  const missingCcodeStyle = !cCode ? "doorfront-client-missing" : "";
  const missingBarCodeStyle = !barcode ? "doorfront-client-missing" : "";

  const onSubmit = async () => {
    await editClient({ cCode, barcode, id: client.id });
    navigate(-1);
  };

  return (
    <div className="doorfront-client">
      <div className="doorfront-client-row">
        <label htmlFor="barcode" className="doorfront-client-label">
          Barcode:
        </label>
        <input
          id="barcode"
          className={`doorfront-client-value ${missingBarCodeStyle}`}
          value={barcode}
          onChange={(e) => {
            setBarcode(e.target.value);
            if (setClientInfo) {
              setClientInfo((current) => ({
                ...current,
                barcode: e.target.value,
              }));
            }
          }}
        />
      </div>
      <div className="doorfront-client-row">
        <label htmlFor="cCode" className="doorfront-client-label">
          Client Number:
        </label>
        <input
          id="cCode"
          className={`doorfront-client-value ${missingCcodeStyle}`}
          value={cCode}
          onChange={(e) => {
            setCcode(e.target.value);
            if (setClientInfo) {
              setClientInfo((current) => ({
                ...current,
                cCode: e.target.value,
              }));
            }
          }}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <button onClick={onSubmit}>
            Update client info without adding meals
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientInformation;
