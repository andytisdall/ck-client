import { useParams } from "react-router-dom";
import Loading from "../../reusable/loading/Loading";
import VolunteerJob from "./VolunteerJob";
import { useGetShiftsQuery } from "../../../state/apis/volunteerApi/homeChefApi";

const JobDetail = () => {
  const { jobId } = useParams();

  const { data, isLoading } = useGetShiftsQuery();
  const jobs = data?.jobs;

  if (isLoading) {
    return <Loading />;
  }

  const job = jobs?.find((j) => j.id === jobId);

  if (!job) {
    return <p>Fridge Not Found.</p>;
  }

  return (
    <div className="jobs-list">
      <VolunteerJob job={job} open={true} />
    </div>
  );
};

export default JobDetail;
