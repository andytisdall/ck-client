import Loading from "../../reusable/loading/Loading";
import { useGetVoicemailQuery } from "../../../state/apis/textApi";
import VoicemailItem from "./VoicemailItem";

const CheckVoicemail = () => {
  const { data: voicemail, isFetching } = useGetVoicemailQuery();

  return (
    <div>
      {isFetching && <Loading />}
      {voicemail?.recordings.length === 0 && <div>No Voicemail Found.</div>}
      {voicemail?.recordings.map((vm) => (
        <VoicemailItem voicemailId={vm.sid} />
      ))}
    </div>
  );
};

export default CheckVoicemail;
