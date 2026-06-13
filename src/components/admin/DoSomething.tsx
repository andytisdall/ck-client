// import serverCall from 'state'
import Loading from "../reusable/loading/Loading";
import { useAddAllToResourcesMutation } from "../../state/apis/textApi";

const DoSomething = () => {
  const [doSomething, { isLoading, isError, data, isSuccess }] =
    useAddAllToResourcesMutation();
  return (
    <div>
      {isError ? (
        "Error"
      ) : isLoading ? (
        <Loading />
      ) : isSuccess ? (
        `Users: ${data?.length}`
      ) : (
        <button onClick={() => doSomething().unwrap()}>Do the Thing</button>
      )}
    </div>
  );
};

export default DoSomething;
