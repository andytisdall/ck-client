import { DriverJob } from "../../../../state/apis/volunteerApi/types";

const DriverJobInfo = ({ job }: { job: DriverJob }) => {
  return (
    <div>
      <div>
        <strong>Minimum Vehicle Size Required: </strong>
        {job.carSizeRequired}
      </div>
      <div>
        <strong>Estimated Distance: </strong>
        {job.distance} mile{job.distance !== 1 ? "s" : ""}
      </div>
      <div>
        <strong>Estimated Time Required: </strong>
        {job.timeRequired} hour{job.timeRequired !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default DriverJobInfo;
