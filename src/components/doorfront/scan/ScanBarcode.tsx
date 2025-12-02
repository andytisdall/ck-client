import { FormEventHandler, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

const GENERIC_CARD_CODE = "189137";

const ScanBarcode = () => {
  const [clientId, setClientId] = useState("");
  const [entryType, setEntryType] = useState<"manual" | "external" | "camera">(
    "external"
  );

  const scannerInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // scanned with camera or scanner
  // scanned with long code

  // manually typed with the client id (not the barcode)

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (entryType === "external") {
      const scannerInputValue = scannerInputRef.current?.value;
      if (scannerInputValue) {
        navigate(scannerInputValue);
      }
    }
    if (entryType === "manual") {
      navigate(clientId + "?cCode=true");
    }
  };

  const getMode = () => {
    if (entryType === "manual") {
      return "Manual Entry";
    }
    if (entryType === "external") {
      return "External Scanner";
    }
    if (entryType === "camera") {
      return "Built-In Camera";
    }
  };
  const renderMode = () => {
    return (
      <div>
        <strong>Scan Mode:</strong> {getMode()}
      </div>
    );
  };

  const renderCameraScanner = () => {
    return (
      <div className="doorfront-camera-scanner">
        <BarcodeScanner
          options={{ formats: ["code_128"] }}
          onCapture={(detected) => {
            const id = detected[0].rawValue.replace(/[^a-zA-Z0-9 ]/g, "");
            navigate(id);
          }}
        />
      </div>
    );
  };

  const renderManualEntry = () => {
    return (
      <div>
        <label htmlFor="manual-entry">Client ID:</label>
        <input
          id="manual-entry"
          value={clientId}
          onChange={(e) => setClientId(e.target.value.toUpperCase())}
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
          key="scan"
          autoFocus
          className="doorfront-scan-input"
          ref={scannerInputRef}
          data-testid="scanner"
        />
      </div>
    );
  };

  const renderNav = () => {
    return (
      <div className="doorfront-nav">
        {entryType !== "camera" && (
          <button onClick={() => setEntryType("camera")}>
            Scan with this device's built-in camera
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
    <div className="doorfront-scan-container">
      <form onSubmit={onSubmit} className="doorfront-scan">
        <div className="doorfront-content">{renderContent()}</div>
      </form>
      {renderMode()}
      {renderNav()}
      <div className="doorfront-submit-row">
        <button className="cancel" onClick={() => navigate("..")}>
          Cancel
        </button>
        <button onClick={() => navigate(GENERIC_CARD_CODE + "?cCode=true")}>
          Add Meals to Generic Card
        </button>
      </div>
    </div>
  );
};

export default ScanBarcode;
