// import serverCall from 'state'
import Loading from "../reusable/loading/Loading";
import {
  useGetPermissionsSetsQuery,
  useUpdatePermissionSetMutation,
} from "../../state/apis/authApi";

const DoSomething = () => {
  const { data: permissionSets } = useGetPermissionsSetsQuery();
  const [updatePermissionSet, { isLoading, isError, isSuccess }] =
    useUpdatePermissionSetMutation();
  const renderPermissionSets = () => {
    if (permissionSets) {
      return [...permissionSets]
        .sort((a, b) => (a.Name > b.Name ? 1 : -1))
        .map((perm) => {
          return (
            <div key={perm.Id}>
              <button
                onClick={
                  () =>
                    updatePermissionSet({ permissionSetId: perm.Id }).unwrap()
                  // console.log(perm)
                }
              >
                {perm.Name}
              </button>
            </div>
          );
        });
    }
  };

  return (
    <div>
      {isError ? (
        "Error"
      ) : isLoading ? (
        <Loading />
      ) : isSuccess ? (
        `Updated`
      ) : (
        renderPermissionSets()
      )}
    </div>
  );
};

export default DoSomething;
