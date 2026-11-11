import { Outlet, Link } from "react-router-dom";

const VoicemailBase = () => {
  return (
    <div className="voicemail">
      <Link to="/admin/voicemail">
        <h3>Voicemail</h3>
      </Link>
      <Outlet />
    </div>
  );
};
export default VoicemailBase;
