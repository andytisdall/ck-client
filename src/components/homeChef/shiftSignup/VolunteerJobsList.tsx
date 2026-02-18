import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import { useGetShiftsQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import VolunteerJob from "./VolunteerJob";
import Loading from "../../reusable/loading/Loading";
import { FridgeRegion, Job } from "../../../state/apis/volunteerApi/types";
import "./VolunteerJob.css";

const VolunteerJobsList = () => {
  const { data, isLoading } = useGetShiftsQuery();
  const jobs = data?.jobs;

  const kitchenJob = jobs?.find((job) => job.region === "CK Kitchen");

  const validJobs = jobs?.filter((j) => j.ongoing && j.region);

  const renderFridges = useCallback((fridges: Job[]) => {
    return fridges
      .sort((a) => (a.active ? -1 : 1))
      .map((job) => {
        return <VolunteerJob job={job} key={job.id} />;
      });
  }, []);

  const regions = useMemo(
    () => Array.from(new Set(validJobs?.map((j) => j.region!))),
    [validJobs],
  );

  const renderRegion = (region: FridgeRegion) => {
    if (validJobs) {
      return (
        <div className="home-chef-fridges-region" key={region}>
          <h2 className="region-name">{region}</h2>
          <div>
            {renderFridges(
              validJobs.filter((fridge) => fridge.region === region),
            )}
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
      <div>
        {kitchenJob && (
          <Link
            to={`../job/${kitchenJob.id}`}
            className="deliver-to-kitchen-btn"
          >
            NEW! Deliver your Home Chef meals directly to the CK Kitchen
          </Link>
        )}
        <div className="home-chef-fridges">{regions.map(renderRegion)}</div>
      </div>
    );
  };

  return isLoading ? <Loading /> : renderRegions();
};

export default VolunteerJobsList;
