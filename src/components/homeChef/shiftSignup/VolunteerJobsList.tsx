import { useCallback, useMemo } from "react";

import { useGetShiftsQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import VolunteerJob from "./VolunteerJob";
import Loading from "../../reusable/loading/Loading";
import { FridgeRegion, Job } from "../../../state/apis/volunteerApi/types";
import "./VolunteerJob.css";

const VolunteerJobsList = () => {
  const { data, isLoading } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const renderFridges = useCallback((fridges: Job[]) => {
    return fridges
      .filter((job) => job.ongoing)
      .sort((a) => (a.active ? -1 : 1))
      .map((job) => {
        return <VolunteerJob job={job} key={job.id} />;
      });
  }, []);

  const regions = useMemo(
    () =>
      Array.from(new Set(jobs?.filter((j) => j.region).map((j) => j.region!))),
    [jobs]
  );

  const renderRegion = (region: FridgeRegion) => {
    if (jobs) {
      return (
        <div className="home-chef-fridges-region" key={region}>
          <h2 className="region-name">{region}</h2>
          <div>
            {renderFridges(jobs.filter((fridge) => fridge.region === region))}
          </div>
        </div>
      );
    }
  };

  const renderRegions = () => {
    if (!jobs) {
      return <div>Could not retrieve fridge info.</div>;
    }

    return (
      <div className="home-chef-fridges">
        {regions.map((r) => renderRegion(r))}
      </div>
    );
  };

  return isLoading ? <Loading /> : renderRegions();
};

export default VolunteerJobsList;
