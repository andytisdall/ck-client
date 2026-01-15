import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Client } from "../../../state/apis/mealProgramApi/doorfrontApi";
import { useEditClientMutation } from "../../../state/apis/mealProgramApi/doorfrontApi";
import Loading from "../../reusable/loading/Loading";

interface ClientInfo {
  cCode: string;
  barcode: string[];
}

const ClientInformation = ({
  client,
  setClientInfo,
}: {
  client: Client;
  setClientInfo?: (newInfo: ClientInfo) => void;
}) => {
  const [cCode, setCcode] = useState(client.cCode || "");
  const [barcode, setBarcode] = useState([...client.barcode, ""]);

  const [editClient, { isLoading }] = useEditClientMutation();

  useEffect(() => {
    if (setClientInfo) {
      setClientInfo({
        cCode,
        barcode,
      });
    }
  }, [setClientInfo, cCode, barcode]);

  const navigate = useNavigate();

  const missingCcodeStyle =
    !cCode || client.cCodeIncorrect ? "doorfront-client-missing" : "";
  const missingBarCodeStyle =
    !barcode.length || client.cCodeIncorrect ? "doorfront-client-missing" : "";

  const onSubmit = async () => {
    await editClient({ cCode, barcode, id: client.id }).unwrap();
    navigate("..");
  };

  const inputsToRender = barcode.length ? barcode : [""];

  return (
    <div className="doorfront-client">
      <div className="doorfront-client-row">
        <label htmlFor="barcode" className="doorfront-client-label">
          Barcode:
        </label>
        <div className="doorfront-barcode-list">
          {inputsToRender.map((bc, i) => (
            <input
              key={`barcode-${i}`}
              id="barcode"
              className={`doorfront-client-value ${missingBarCodeStyle}`}
              value={bc}
              onChange={(e) => {
                const newBarcodes = [...barcode];
                newBarcodes[i] = e.target.value.toUpperCase();
                setBarcode(newBarcodes);
              }}
            />
          ))}
        </div>
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
            const upperCaseCode = e.target.value.toUpperCase();
            setCcode(upperCaseCode);
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
