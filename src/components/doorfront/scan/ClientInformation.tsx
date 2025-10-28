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
  const [barcodes, setBarcodes] = useState(client.barcodes);

  const [editClient, { isLoading }] = useEditClientMutation();

  const navigate = useNavigate();

  const missingCcodeStyle =
    !cCode || client.cCodeIncorrect ? "doorfront-client-missing" : "";
  const missingBarCodeStyle =
    !barcodes.length || client.cCodeIncorrect ? "doorfront-client-missing" : "";

  const onSubmit = async () => {
    await editClient({ cCode, barcodes, id: client.id }).unwrap();
    navigate(-1);
  };

  return (
    <div className="doorfront-client">
      <div className="doorfront-client-row">
        <label htmlFor="barcode" className="doorfront-client-label">
          Barcode:
        </label>
        {barcodes.map((barcode, i) => (
          <input
            id="barcode"
            className={`doorfront-client-value ${missingBarCodeStyle}`}
            value={barcode}
            onChange={(e) => {
              setBarcodes((barcodes) => {
                const newBarcodes = [...barcodes];
                newBarcodes[i] = e.target.value;
                return newBarcodes;
              });
              if (setClientInfo) {
                setClientInfo((current) => ({
                  ...current,
                  barcode: e.target.value,
                }));
              }
            }}
          />
        ))}
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
        {client.cCodeIncorrect && (
          <div className="meal-report-warning">
            ! This client number was marked incorrect
          </div>
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <button onClick={onSubmit}>
          Update client info without adding meals
        </button>
      )}
    </div>
  );
};

export default ClientInformation;
