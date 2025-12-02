import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import { useGetShiftsQuery } from "../../../state/apis/volunteerApi/homeChefApi";
import VolunteerJob from "./VolunteerJob";
import Loading from "../../reusable/loading/Loading";
import { FridgeRegion, Job } from "../../../state/apis/volunteerApi/types";
import "./VolunteerJob.css";
import { useGetUserQuery } from "../../../state/apis/authApi";

const VolunteerJobsList = () => {
  const { data, isLoading } = useGetShiftsQuery();
  const jobs = data?.jobs;
  const { data: user } = useGetUserQuery();

  const kitchenJob = jobs?.find((job) => !job.region);

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
      Array.from(
        new Set(
          jobs
            ?.filter((j) => j.region && j.region !== "CK Kitchen")
            .map((j) => j.region!)
        )
      ),
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
      <div>
        {user?.admin && kitchenJob && (
          <Link
            to={`../job/${kitchenJob.id}`}
            className="deliver-to-kitchen-btn"
          >
            NEW! Deliver your Home Chef meals directly to the CK Kitchen
          </Link>
        )}
        <div className="home-chef-fridges">
          {regions.map((r) => renderRegion(r))}
        </div>
      </div>
    );
  };

  return isLoading ? <Loading /> : renderRegions();
};

export default VolunteerJobsList;
