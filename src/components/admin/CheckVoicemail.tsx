import { useState } from "react";
import { format } from "date-fns";

import Loading from "../reusable/loading/Loading";
import {
  useGetVoicemailQuery,
  useDeleteVoicemailMutation,
} from "../../state/apis/textApi";

const CheckVoicemail = () => {
  const [modalOpen, setModalOpen] = useState("");
  const { data: voicemail, isFetching } = useGetVoicemailQuery(undefined, {
    pollingInterval: 1000 * 60 * 5,
  });

  const [deleteVoicemail, { isLoading: deleteLoading }] =
    useDeleteVoicemailMutation();

  if (isFetching || deleteLoading) {
    return <Loading />;
  }

  const userVmIds = voicemail?.userVms?.map((vm) => vm.recordingId);

  const renderUser = (vmId: string) => {
    if (userVmIds?.includes(vmId)) {
      const username = voicemail?.userVms?.find(
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

  const renderModal = () => {
    return (
      <div className="voicemail-delete-modal">
        <h4>Confirm Deletion</h4>
        <button
          className="cancel"
          onClick={async () => await deleteVoicemail(modalOpen).unwrap()}
        >
          Delete
        </button>
        <button onClick={() => setModalOpen("")}>Back</button>
      </div>
    );
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

  return (
    <ul className="voicemail">
      <h3>Voicemail</h3>
      {voicemail?.recordings.length === 0 && <div>No Voicemail Found.</div>}
      {voicemail?.recordings.map((vm) => (
        <li key={vm.mediaUrl} className="voicemail-item">
          <div className="voicemail-info">
            <div>{format(new Date(vm.dateCreated), "M/d/yy h:mm a")}</div>
            {renderUser(vm.sid)}
            {!!vm.from && <div>{formatPhoneNumber(vm.from)}</div>}
          </div>
          <audio src={vm.mediaUrl} controls />
          <div
            className="voicemail-delete"
            onClick={() => setModalOpen(vm.sid)}
          >
            X
          </div>
          {modalOpen === vm.sid && renderModal()}
        </li>
      ))}
    </ul>
  );
};

export default CheckVoicemail;
