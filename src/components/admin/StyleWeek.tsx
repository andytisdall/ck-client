import {
  useSetStyleWeekActiveMutation,
  useGetStyleWeekActiveQuery,
} from "../../state/apis/d4jApi";
import Loading from "../reusable/loading/Loading";

const Style = () => {
  const { data, isFetching } = useGetStyleWeekActiveQuery();
  const [setStyleWeekActive] = useSetStyleWeekActiveMutation();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <input
        id="contest-active"
        type="checkbox"
        checked={data?.contestActive}
        onChange={async (e) =>
          await setStyleWeekActive({ active: e.target.checked }).unwrap()
        }
      />
      <label htmlFor="contest-active">Contest Active</label>
    </div>
  );
};

export default Style;
