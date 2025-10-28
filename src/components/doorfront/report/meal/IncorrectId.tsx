import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Client,
  useEditClientMutation,
} from "../../../../state/apis/mealProgramApi/doorfrontApi";

const IncorrectId = ({ client }: { client: Client }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const callback = (e: Event) => {
      console.log(e.target);
      if (e.target !== ref.current) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", callback);
    return () => document.removeEventListener("click", callback);
  }, []);

  const [editClient] = useEditClientMutation();

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="meal-report-menu-container">
      <div
        className="meal-report-dots"
        ref={ref}
        onClick={() => setMenuOpen((current) => !current)}
      >
        ...
        {client.cCodeIncorrect && (
          <div className="meal-report-warning">Incorrect Client #</div>
        )}
      </div>

      {menuOpen && (
        <div className="meal-report-menu">
          <div
            className="meal-report-menu-item"
            onClick={async () => {
              await editClient({
                barcode: client.barcode,
                cCode: client.cCode,
                cCodeIncorrect: true,
                id: client.id,
              }).unwrap();
            }}
          >
            Mark Client # as Incorrect
          </div>
          <div className="meal-report-menu-item">
            {" "}
            <Link to={"/doorfront/client-report/" + client.id}>
              Go to Client
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncorrectId;
