import { Link, Navigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";

import Loading from "../../reusable/loading/Loading";
import {
  useGetVoicemailQuery,
  useDeleteVoicemailMutation,
} from "../../../state/apis/textApi";

const VoicemailItem = ({ voicemailId }: { voicemailId?: string }) => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isFetching } = useGetVoicemailQuery();
  const [deleteVoicemail, { isLoading }] = useDeleteVoicemailMutation();

  const userVmIds = data?.userVms?.map((vm) => vm.recordingId);
  const vmId = id || voicemailId;
  const voicemail = data?.recordings.find((vm) => vm.sid === vmId);

  const renderUser = () => {
    if (vmId && userVmIds?.includes(vmId)) {
      const username = data?.userVms?.find(
        (uvm) => uvm.recordingId === vmId,
      )?.user;
      return (
        <div>
          For:{" "}
          <span className="voicemail-highlight">
            {username || "Jaynemarie Angbah"}
          </span>
        </div>
      );
    } else {
      return <div>General Inbox</div>;
    }
  };

  const formatPhoneNumber = (number: string) => {
    return (
      <div>
        From:{" "}
        <span className="voicemail-highlight">
          ({number.slice(0, 3)}) {number.slice(3, 6)}-{number.slice(6)}
        </span>
      </div>
    );
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (!voicemail) {
    if (id) {
      return <Navigate replace to=".." />;
    }
    return <div />;
  }

  const renderModal = () => {
    return (
      <div className="voicemail-delete-modal">
        <h4>Confirm Deletion</h4>
        <button
          className="cancel"
          onClick={async () => {
            await deleteVoicemail(voicemail.sid).unwrap();
            setModalOpen(false);
          }}
        >
          Delete
        </button>
        <button onClick={() => setModalOpen(false)}>Back</button>
      </div>
    );
  };

  return (
    <div key={voicemail.mediaUrl} className="voicemail-item">
      {!!id && (
        <Link to=".." className="voicemail-arrow">
          &larr;
        </Link>
      )}
      <Link className="voicemail-info" to={!id ? voicemail.sid : ""}>
        <div>{format(new Date(voicemail.dateCreated), "M/d/yy h:mm a")}</div>
        {renderUser()}
        {!!voicemail.from && <div>{formatPhoneNumber(voicemail.from)}</div>}
      </Link>

      <audio src={voicemail.mediaUrl} controls />
      <div className="voicemail-delete" onClick={() => setModalOpen(true)}>
        X
      </div>
      {modalOpen && renderModal()}
    </div>
  );
};

export default VoicemailItem;
