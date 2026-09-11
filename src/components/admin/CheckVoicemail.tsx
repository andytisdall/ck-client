// import serverCall from 'state'
import { format } from "date-fns";

import Loading from "../reusable/loading/Loading";
import {
  useGetVoicemailQuery,
  useDeleteVoicemailMutation,
} from "../../state/apis/textApi";

const CheckVoicemail = () => {
  const { data: voicemail, isFetching } = useGetVoicemailQuery();
  const [deleteVoicemail, { isLoading: deleteLoading }] =
    useDeleteVoicemailMutation();

  if (isFetching || deleteLoading) {
    return <Loading />;
  }

  return (
    <ul className="voicemail">
      <h3>Voicemail</h3>
      {voicemail?.length === 0 && <div>No Voicemail Found.</div>}
      {voicemail?.map((vm) => (
        <li key={vm.mediaUrl} className="voicemail-item">
          <div>{format(new Date(vm.dateCreated), "M/d/yy h:mm a")}</div>
          <audio src={vm.mediaUrl} controls />
          <div
            className="voicemail-delete"
            onClick={async () => await deleteVoicemail(vm.sid).unwrap()}
          >
            X
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CheckVoicemail;
