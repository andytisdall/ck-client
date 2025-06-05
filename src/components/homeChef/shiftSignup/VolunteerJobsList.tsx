import { useGetShiftsQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import VolunteerJob from "./VolunteerJob";
import Loading from "../../reusable/loading/Loading";
import { Job } from "../../../state/apis/volunteerApi/types";
import "./VolunteerJob.css";

const VolunteerJobsList = () => {
  const { data, isLoading } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const renderFridges = (fridges: Job[]) => {
    return fridges
      .filter((job) => job.ongoing)
      .sort((a) => (a.active ? -1 : 1))
      .map((job) => {
        return <VolunteerJob job={job} key={job.id} />;
      });
  };

  const renderRegions = () => {
    if (jobs) {
      return (
        <div className="home-chef-fridges">
          <div className="home-chef-fridges-region">
            <h2 className="region-name">East Oakland</h2>
            <div>
              {renderFridges(
                jobs.filter((fridge) => fridge.region === "East Oakland")
              )}
            </div>
          </div>
          <div className="home-chef-fridges-region">
            <h2 className="region-name">West Oakland</h2>
            <div>
              {renderFridges(
                jobs.filter((fridge) => fridge.region === "West Oakland")
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="jobs-list">{isLoading ? <Loading /> : renderRegions()}</div>
  );
};

export default VolunteerJobsList;
