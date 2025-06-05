import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

const ScanBarcode = () => {
  const [clientId, setClientId] = useState("");

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    navigate(clientId);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Client ID:</label>
      <input
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        autoFocus
      />
      <input type="submit" />
    </form>
  );
};

export default ScanBarcode;
