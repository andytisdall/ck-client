import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";

import "./TownFridges.css";
import { useGetJobsQuery } from "../../../state/apis/volunteerApi/jobs";
import FridgeMap from "../../homeChef/fridgeMap/FridgeMap";
import Loading from "../../reusable/loading/Loading";
import volunteerCampaignConfig from "../config";
import Fridge from "./Fridge";
import { FridgeRegion } from "../../../state/apis/volunteerApi/types";

const REGION_VALUES = {
  "east-oakland": "East Oakland",
  "west-oakland": "West Oakland",
  berkeley: "Berkeley",
};

const BARTLETT_FRIDGE_ID = "a0w8Z00000YU0nHQAT";

const TownFridges = () => {
  const { region }: { region?: keyof typeof REGION_VALUES } = useParams();
  const { data: jobs, isLoading } = useGetJobsQuery({
    campaignId: volunteerCampaignConfig.homeChef.id,
  });

  const validJobs = useMemo(() => {
    return jobs?.filter((j) => {
      return (
        j.active &&
        j.region &&
        j.region !== "CK Kitchen" &&
        (region ? j.region === REGION_VALUES[region] : true) &&
        (region ? j.id !== BARTLETT_FRIDGE_ID : true)
      );
    });
  }, [jobs, region]);

  const regions = useMemo(
    () => Array.from(new Set(validJobs?.map((j) => j.region!))),
    [validJobs],
  );

  if (region && !Object.keys(REGION_VALUES).includes(region)) {
    return <Navigate to="../town-fridges" />;
  }

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
      {!region && <FridgeMap />}
    </div>
  );
};

export default TownFridges;
