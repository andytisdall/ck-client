import { useDeclareWinnerQuery } from "../state/apis/d4jApi";

import "./header/Header.css";
import "./Home.css";

const CocktailContest = () => {
  const { data: totals } = useDeclareWinnerQuery();
  return (
    <div className="main home">
      <img
        src="/images/logos/style-week-logo.png"
        alt="style week"
        className="style-img"
      />
      <h2>Cocktail Contest Results:</h2>
      {totals?.map((t) => {
        return <div key={t}>{t}</div>;
      })}
    </div>
  );
};

export default CocktailContest;
