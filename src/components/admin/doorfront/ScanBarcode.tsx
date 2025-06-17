import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

import "./Doorfront.css";

const ScanBarcode = () => {
  const [clientId, setClientId] = useState("");
  const [entryType, setEntryType] = useState<"manual" | "external" | "camera">(
    "external"
  );

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    navigate(clientId);
  };

  const renderCameraScanner = () => {
    return (
      <div className="doorfront-camera-scanner">
        <BarcodeScanner
          onCapture={(detected) => {
            const rawValue = detected[0].rawValue.split("/");
            navigate(rawValue[rawValue.length - 1]);
          }}
        />
      </div>
    );
  };

  const renderManualEntry = () => {
    return (
      <div>
        <label>Client ID:</label>
        <input
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          autoFocus
          className="doorfront-text-input"
        />
        <input type="submit" />
      </div>
    );
  };

  const renderExternalScanner = () => {
    return (
      <div>
        <div className="doorfront-scan-now">Scan Barcode Now</div>
        <input
          onChange={(e) => navigate(e.target.value)}
          autoFocus
          className="doorfront-scan-input"
          value=""
        />
      </div>
    );
  };

  const renderNav = () => {
    return (
      <div className="doorfront-nav">
        {entryType !== "camera" && (
          <button onClick={() => setEntryType("camera")}>
            Scan with this device's camera
          </button>
        )}
        {entryType !== "manual" && (
          <button onClick={() => setEntryType("manual")}>
            Manually Enter Client ID
          </button>
        )}
        {entryType !== "external" && (
          <button onClick={() => setEntryType("external")}>
            Scan with external scanner
          </button>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (entryType) {
      case "external":
        return renderExternalScanner();
      case "manual":
        return renderManualEntry();
      case "camera":
        return renderCameraScanner();
      default:
        return <div>Reload this page.</div>;
    }
  };

  return (
    <form onSubmit={onSubmit} className="doorfront-scan">
      {renderNav()}
      {renderContent()}
    </form>
  );
};

export default ScanBarcode;
