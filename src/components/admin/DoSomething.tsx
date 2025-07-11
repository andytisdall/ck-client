// import serverCall from 'state'
import Loading from "../reusable/loading/Loading";
import { useTestEmailMutation } from "../../state/apis/authApi";

const DoSomething = () => {
  const [doSomething, { isLoading, isError, data, isSuccess }] =
    useTestEmailMutation();
  return (
    <div>
      {isError ? (
        "Error"
      ) : isLoading ? (
        <Loading />
      ) : isSuccess ? (
        `${data}`
      ) : (
        <button onClick={() => doSomething()}>Do the Thing</button>
      )}
    </div>
  );
};

export default DoSomething;
