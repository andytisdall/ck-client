// import serverCall from 'state'
import Loading from "../reusable/loading/Loading";
import { useResetWaiversMutation } from "../../state/apis/volunteerApi/volunteerApi";

const DoSomething = () => {
  const [doSomething, { isLoading, isError, data, isSuccess }] =
    useResetWaiversMutation();
  return (
    <div>
      {isError ? (
        "Error"
      ) : isLoading ? (
        <Loading />
      ) : isSuccess ? (
        `Contacts updated: ${data?.number}`
      ) : (
        <button onClick={() => doSomething().unwrap()}>Do the Thing</button>
      )}
    </div>
  );
};

export default DoSomething;
