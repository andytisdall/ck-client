import { useDeclareWinnerQuery } from "../state/apis/d4jApi";
import Loading from "./reusable/loading/Loading";

import "./Home.css";

const CocktailContestResults = () => {
  const { data, isLoading } = useDeclareWinnerQuery(undefined, {
    pollingInterval: 60 * 1000 * 2,
  });

  const sortedTotals = data
    ? Object.keys(data)
        .sort((a, b) => (data[a] > data[b] ? -1 : 1))
        .map((name) => [name, data[name]])
    : null;

  const renderResults = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (!sortedTotals?.length) {
      return <strong>No results found.</strong>;
    }
    return (
      <table className="contest-table">
        <tr>
          <td>
            <strong>Place</strong>
          </td>
          <td>
            <strong>Bar</strong>
          </td>
          <td>
            <strong>Votes</strong>
          </td>
        </tr>
        {sortedTotals?.map((bar, i) => {
          let style = "";
          if (i === 0) {
            style = "contest-winner";
          }
          return (
            <tr className={style}>
              <td>{i + 1}</td>
              <td>{bar[0]}</td>
              <td>{bar[1]}</td>
            </tr>
          );
        })}
      </table>
    );
  };
  return (
    <div className="main home">
      <h2>Style Week Cocktail Contest 2026 Results</h2>
      {renderResults()}
    </div>
  );
};

export default CocktailContestResults;
