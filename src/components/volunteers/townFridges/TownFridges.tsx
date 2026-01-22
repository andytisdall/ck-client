import { useMemo } from "react";

import "./TownFridges.css";
import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import FridgeMap from "../../homeChef/fridgeMap/FridgeMap";
import Loading from "../../reusable/loading/Loading";
import volunteerCampaignConfig from "../config";
import Fridge from "./Fridge";
import { FridgeRegion } from "../../../state/apis/volunteerApi/types";

const TownFridges = () => {
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: volunteerCampaignConfig.homeChef.id,
  });

  const validJobs = jobs?.filter(
    (j) => j.active && j.region && j.region !== "CK Kitchen",
  );

  const regions = useMemo(
    () => Array.from(new Set(validJobs?.map((j) => j.region!))),
    [validJobs],
  );

  const renderRegion = (region: FridgeRegion) => {
    if (validJobs) {
      return (
        <div className="town-fridge-region" key={region}>
          <h2 className="town-fridge-region-name">{region}</h2>
          <div>
            {validJobs
              .filter((fridge) => fridge.region === region)
              .map((fridge) => (
                <Fridge fridge={fridge} key={fridge.id} />
              ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="town-fridge-base">
      <h1>Community Kitchens' Town Fridge Network</h1>
      <div className="town-fridge-list">
        {isLoading && <Loading />}
        {regions.map(renderRegion)}
      </div>
      <FridgeMap />
    </div>
  );
};

export default TownFridges;
